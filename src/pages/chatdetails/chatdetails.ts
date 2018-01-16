import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, TextInput, Events } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { ChatserviceProvider, ChatMessage } from '../../providers/chatservice/chatservice';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the ChatdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatdetails',
  templateUrl: 'chatdetails.html',
})
export class ChatdetailsPage {

  chatUserName: string;
  chatUserAvatar:string;

  chatUserId: string;

  eidtorMessage: string = '';

  userId: string;
  userName: string;
  userImgUrl: string;

  isOpenEmojiPicker = false;

  errorMessage: any;


  messageList: ChatMessage[] = [];

  @ViewChild(Content) content: Content; //全局的content
  @ViewChild('chatInput') messageInput: TextInput; //获取前台的输入框

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public storage: Storage,
    public chatService: ChatserviceProvider,
    public event: Events,
    public viewCtrl: ViewController

  ) {

    this.chatUserId = this.navParams.get('userid');
    this.chatUserName = this.navParams.get('username');
    this.chatUserAvatar = this.navParams.get('avatar');
  }

  ionViewDidLoad() {

  }

  ionViewWillLeave() {
    this.event.unsubscribe('chat.received');
  }

  ionViewDidLeave() {
    this.chatService.wsClose();
    //this.viewCtrl.dismiss();
  }

  ionViewDidEnter() {
    this.storage.get('token').then(token => {
      this.storage.get('UserId').then(userid => {
        if (userid != null) {
          this.rest.getUserInfo(token, userid)
            .subscribe(userInfo => {
              this.userId = userInfo['UserId'];
              this.userName = userInfo['UserNickName'];
              this.userImgUrl = userInfo['UserHeadFace'] + "?" + (new Date);


              //获取服务器上对应的聊天记录
              this.getMessage(this.userId, this.chatUserId).map(res => {
                this.scrollToBottom();
              });

            }, error => this.errorMessage = error);


        }
      })
    })

    //开启websocket通讯来接收消息
    this.chatService.connect("ws://192.168.1.111:3600/userId/" + this.userId)
      .subscribe(
      data => {
        this.chatService.wsGetMessage(data);
      },
      error => console.log(error),
      () => console.log('服务器已断开')
      );



    //监控event是否捕获到消息并合并到messageList中显示
    this.event.subscribe('chat.received', (msg, time) => {
      this.messageList.push(msg);
      this.scrollToBottom();
    })

  }

  switchEmojiPicher() {
    this.isOpenEmojiPicker = !this.isOpenEmojiPicker;
  }


  focus() {
    this.isOpenEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }


  scrollToBottom(): any {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom(100);
      }
    }, 100);
  }


  getMessage(userId, touserId): ChatMessage[] {

    this.chatService.getMessageList(userId, touserId)
      .subscribe(res => {
        this.messageList = res;
        console.log(res);
      })


    return this.messageList;
  }


  sendMessage() {
    if (!this.eidtorMessage.trim()) {
      return;
    }



    const id = Date.now().toString();
    let messageSend: ChatMessage = {
      messageId: id,
      type: 'chat',
      userId: this.userId,
      username: this.userName,
      userImgUrl: this.userImgUrl,
      toUserId: this.chatUserId,
      tousername:this.chatUserName,
      touserImgUrl:this.chatUserAvatar,
      time: Date.now(),
      message: this.eidtorMessage,
      satatus: 'pending'
    }


    this.messageList.push(messageSend);
    this.scrollToBottom();

    this.eidtorMessage = '';

    this.isOpenEmojiPicker = false;

    if (!this.isOpenEmojiPicker) {
      this.messageInput.setFocus();
    }


    this.chatService.wsSend(JSON.stringify(messageSend));


  }


  getMessageIndex(messageId) {
    return this.messageList.findIndex(e => e.messageId === messageId);
  }

}
