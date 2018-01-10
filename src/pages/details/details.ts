import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
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
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { AnswerPage } from '../answer/answer';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI {

  id: string;

  question: string[];

  errorMessage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl:ToastController,
    public modalCtrl:ModalController
  ) {
    super();
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');

    this.loadQuestion(this.id);
  }


  loadQuestion(id) {
    this.storage.get('token').then(val => {
      if (val !== null) {
        const loading = super.showLoading(this.loadingCtrl, '加载中...');
        this.rest.getQuestion(val,id)
          .subscribe(q => {
            if(q['Status']==='OK'){
              this.question = q['question'];
              loading.dismiss();
            }
            else if(q['Status']==='403'){
              super.showToast(this.toastCtrl,q["StatusContent"]);
              this.navCtrl.parent.select(4);
            }else{
              super.showToast(this.toastCtrl,q["StatusContent"]);
            }
           
          }, error => this.errorMessage = < any > error)
      } else {
        super.showToast(this.toastCtrl,"您还没有登陆，无法查询");
        this.navCtrl.parent.select(4);
      }
    })
  }


  showAnswerPage(){
    const modal = this.modalCtrl.create(AnswerPage,{'id':this.id});

    modal.present();

    modal.onDidDismiss(_=>{
      this.loadQuestion(this.id);
    });
    
  }

}
