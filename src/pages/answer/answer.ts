import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { BaseUI } from '../../common/baseui';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { RestProvider } from '../../providers/rest/rest';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/**
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage extends BaseUI {

  content:string;
  q_id:string;

  errorMessage:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    public loadingCtrl:LoadingController,
    public rest:RestProvider,
    public toastCtrl:ToastController
  ) {
    super();
    this.q_id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerPage');
  }


  dismiss(){
    this.viewCtrl.dismiss();
  }

  submit(){
    this.storage.get('token').then(token=>{
      if(token!=null){
        this.storage.get('UserId').then(userId=>{
          const loading = super.showLoading(this.loadingCtrl,'提交中...');
          this.rest.userAnswer(token,userId,this.q_id,this.content)
          .subscribe(A => {
            if(A['Status']==='OK'){
              loading.dismiss();
              this.dismiss();
            }else if(A['Status']==='403'){
              super.showToast(this.toastCtrl,A["StatusContent"]);
              this.navCtrl.parent.select(4);
            } 
            else{
              loading.dismiss();
              super.showToast(this.toastCtrl,A['StatusContent']);
            }
          },error => this.errorMessage = <any>error);

        })
      }else{
        super.showToast(this.toastCtrl,"请登录后发布");
        this.navCtrl.parent.select(4);
      }
    });
  }

}
