import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatdetailsPage } from '../chatdetails/chatdetails';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {


  userinfo:Object;
  chatdetailsPage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userinfo = {
      userid:'5a547021764a171a043158c4',
      username:'小杰22',
      avatar:'http://192.168.1.111:3500/myappAuth/getimg/19-014845_297.jpg',
    }

    this.chatdetailsPage = ChatdetailsPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
