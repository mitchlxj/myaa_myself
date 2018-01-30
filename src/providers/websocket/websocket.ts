import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs/Observable';
import {
  Events
} from 'ionic-angular';
import {
  Http
} from '@angular/http';
import {
  Storage
} from '@ionic/storage';

/*
  Generated class for the WebsocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebsocketProvider {

  public socketIP = "192.168.1.111";
  public socketPort = "3600";

  ws: WebSocket;

  public chatMessageCount = 0;

  constructor(
    public http: Http,
    public event: Events,
    public storage: Storage
  ) {
    console.log('Hello WebsocketProvider Provider');
  }



  connect(url: string): Observable < any > {
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

    switch (tmpMessage.type) {

      case 'chat':

        this.event.publish('chat.received', tmpMessage, Date.now());
       
        this.chatMessageCount +=1;

        console.log(this.chatMessageCount);

        break;

      case 'interval':

        console.log(tmpMessage.message);
    }


  }


  wsOpenConnect() {
    if (this.ws == null) {
      //开启websocket通讯来接收消息
      this.storage.get('UserId').then(userId => {
        if (userId != null) {
          const ip = this.socketIP;
          const port = this.socketPort;
          const url = "ws://" + ip + ":" + port + "/userId/" + userId;
          this.connect(url)
            .subscribe(
              data => {
                this.wsGetMessage(data);
              },
              error => console.log(error),
              () => console.log('服务器已断开')
            );
        }
      })

    }

  }

}
