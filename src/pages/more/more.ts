import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  ModalController
} from 'ionic-angular/components/modal/modal-controller';
import {
  LoginPage
} from '../login/login';
import {
  Storage
} from '@ionic/storage';
import {
  BaseUI
} from '../../common/baseui';
import {
  LoadingController
} from 'ionic-angular/components/loading/loading-controller';
import {
  RestProvider
} from '../../providers/rest/rest';
import {
  UserPage
} from '../user/user';
import {
  ToastController
} from 'ionic-angular/components/toast/toast-controller';
import { WebsocketProvider } from '../../providers/websocket/websocket';

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI {

  headFace: string;

  userinfo: string[];

  notLogin: boolean = true;
  logined: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public loading: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public webSocket:WebsocketProvider
  ) {
    super();
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    this.loadUserPage();
  }

  showModal() {
    const modal = this.modalCtrl.create(LoginPage);
    //关闭后的回调 因为modal关闭的时候，不会再次触发父页面的ionViewDidEnter
    modal.onDidDismiss(() => {
      this.loadUserPage();
    });

    modal.present();
  }


  loadUserPage() {
    this.storage.get('token').then((val) => {
      if (val != null) {
        this.storage.get('UserId').then(userid => {
          //加载用户数据
          const loading = super.showLoading(this.loading, "加载中...");
          this.rest.getUserInfo(val, userid).subscribe((userinfo) => {
            console.log(JSON.stringify(userinfo));
            this.userinfo = userinfo;
            //判断token是否失效或伪造的，如果是的话就清空token重新登录
            if (userinfo['Status'] === '403') {
              this.storage.remove('token');
              this.storage.remove('UserId');
              this.notLogin = true;
              this.logined = false;
              super.showToast(this.toastCtrl, userinfo['StatusContent']);
              loading.dismiss();
            } else {
              //给资源文件增加一个后缀，去除缓存
              this.headFace = userinfo["UserHeadFace"] + "?" + (new Date()).valueOf();

              console.log(this.headFace);
              this.notLogin = false;
              this.logined = true;
              loading.dismiss();

              this.webSocket.wsOpenConnect();
             
            }
          });
        });


      } else {
        this.notLogin = true;
        this.logined = false;
      }
    })
  }


  gotoUserPage() {
    this.navCtrl.push(UserPage);
  }

}
