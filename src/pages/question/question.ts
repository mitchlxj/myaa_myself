import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { FormGroup,Validators,FormBuilder} from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage extends BaseUI {

  title:string;

  content:string;

  form:FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    private fb:FormBuilder,
    public rest: RestProvider,
    public toastCtrl:ToastController
  ) {
    super();

    this.form=this.fb.group({
      title:['',Validators.required],
      content:['',Validators.required],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }


  dismiss(){
    this.viewCtrl.dismiss();
  }

  onSubmit({value,valid},ev:Event){
    ev.preventDefault();
    console.log(value);
    this.storage.get('token').then(token=>{
      if(token!=null){
        this.storage.get('UserId').then(userId=>{
          const loading = super.showLoading(this.loadingCtrl, "提交中...");
          const data ={
            'token':token,
            'userId':userId,
            'title':value.title,
            'content':value.content,
          }
          this.rest.SaveQuestion(data)
          .subscribe(f=>{
            if (f["Status"] == "OK") {
              loading.dismiss();
              super.showToast(this.toastCtrl, "提交成功");
              this.dismiss();
              
            }else if(f['Status']==='403'){
              super.showToast(this.toastCtrl,f["StatusContent"]);
              this.navCtrl.parent.select(4);
            }
             else {
              loading.dismiss();
              super.showToast(this.toastCtrl, f["StatusContent"]);
            }
          })
        })
      }else{
        super.showToast(this.toastCtrl, "请先登录，在提交问题！");
        this.navCtrl.parent.select(4);
      }
    })
    
  }

}
