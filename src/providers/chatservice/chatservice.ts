import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular/util/events';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ChatserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/



export class ChatMessage {
  messageId: string;
  type: string;
  userId: string;
  username: string;
  userImgUrl: string;
  toUserId: string;
  tousername:string;
  touserImgUrl:string;
  time: number | string;
  message: string;
  satatus: string;
}


export class userInfo {
  userId: string;
  userName: string;
  userImgUrl: string;
}



@Injectable()
export class ChatserviceProvider {


  ws: WebSocket;

  constructor(
    public http: Http,
    public event: Events,
    public storage: Storage
  ) {
    console.log('chatservice构造函数');
  }

  connect(url: string): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
      }
    );
  }

  wsSend(message) {
    this.ws.send(message);
  }

  wsClose() {
    this.ws.close();
  }

  wsGetMessage(messageSend) {
    const tmpMessage = JSON.parse(messageSend);
    if(tmpMessage.type=='chat'){
      this.event.publish('chat.received', tmpMessage, Date.now());
    }
  }



  getMessageList(userId,touserId): Observable<ChatMessage[]> {

    const url = 'http://192.168.1.111:3500/chat/getmessgelist?userId=' + userId+"&touserId="+touserId;
    return this.http.get(url)
      .map(res => {
        const body = res.json();
        console.log(body);
       return body.chatData;
      });

  }

  sendMessage(message: ChatMessage): Observable<ChatMessage> {
    return new Observable(_ => {
      setTimeout(() => {
        //this.mockNewMessage(message);
      }, 2000);
    })
  }

  // mockNewMessage(chatmessage: any): any {

  //   const id = Date.now.toString();
  //   let messageSend: ChatMessage = {
  //     messageId: id,
  //     type: 'chat',
  //     userId: '123321',
  //     username: '梁女神',
  //     userImgUrl: 'http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg',
  //     toUserId: chatmessage.userId,
  //     time: Date.now(),
  //     message: '你是不是刚才给我发送了[' + chatmessage.message + ']?',
  //     satatus: 'success'
  //   }

  //   setTimeout(() => {
  //     this.event.publish('chat.received', messageSend, Date.now())
  //   }, 1000);

  // }

}
