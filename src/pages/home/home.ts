import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { QuestionPage } from '../question/question';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Tabs } from 'ionic-angular/components/tabs/tabs';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI{


  questionList:string[];


  private index:number =0;
  private count:number =10;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loading :LoadingController,
    public rest: RestProvider,
    public toast:ToastController
  ) {
    super();
  }

  ionViewDidLoad(){
    this.getFeeds();
   }

  gotoQuestion(){
    const modal = this.modalCtrl.create(QuestionPage);
    modal.present();
  }



  getFeeds(){
    const loading = super.showLoading(this.loading,"加载中...");
    this.rest.getQusetionList(this.index,this.count)
    .subscribe(q_list=>{
      if(q_list['Status']==='OK'){
        this.questionList = q_list['QuestionList'];
        
      }else{
        super.showToast(this.toast,q_list['StatusContent']);
      }

      loading.dismiss();
    })
  }


  gotoChat(){
    this.selectTab(2);
  }

  selectTab(index:number){
    const t: Tabs = this.navCtrl.parent;
    t.select(index);
  }


  doRefresh(refresher){
    this.getFeeds();
    refresher.complete();
  }


  gotoDetails(id){
    this.navCtrl.push(DetailsPage,{'id':id});
  }


}
