import {
  Component
} from '@angular/core';

import {
  DiscoveryPage
} from '../discovery/discovery';
import {
  ChatPage
} from '../chat/chat';
import {
  HomePage
} from '../home/home';

import {
  NotificationPage
} from '../notification/notification';
import { MorePage } from '../more/more';
import { WebsocketProvider } from '../../providers/websocket/websocket';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabDiscovery = DiscoveryPage;
  tabChat = ChatPage;
  tabNotification = NotificationPage;
  tabMore = MorePage;

  tabBages = '';
  chatMessageCount = 0;
  constructor(public webSocket:WebsocketProvider) {

    setInterval(()=>{
      this.chatMessageCount = this.webSocket.chatMessageCount;
      if(this.chatMessageCount ==0)
      {
        this.tabBages = '';
      }else{
        this.tabBages = this.chatMessageCount.toString();
      }
    },1000)

  }

}
