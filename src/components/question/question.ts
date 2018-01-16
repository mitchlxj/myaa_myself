import { Component,Input} from '@angular/core';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { Storage } from '@ionic/storage';
import { DetailsPage } from '../../pages/details/details';

/**
 * Generated class for the QuestionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'question',
  templateUrl: 'question.html'
})
export class QuestionComponent extends BaseUI {

  text: string;

  questionList: string[];

  errorMessage: any;

  @Input() dataSourceType;

  constructor(
    public rest: RestProvider,
    public storage: Storage,
    public laodingCtrl: LoadingController,
    public toast:ToastController,
    public navCtrl:NavController
  ) {
    super();
  }

  ngAfterContentInit() {

    this.storage.get('token').then(token => {
      console.log(1111);
      console.log(this.dataSourceType);
      if (token != null) {
        this.storage.get('UserId').then(userId => {
          if (userId != null) {
            const loading = super.showLoading(this.laodingCtrl, "加载中...");
            this.rest.getUserQuestionList(userId, this.dataSourceType)
              .subscribe(user_question => {
                console.log(user_question);
                if(user_question['Status']==='OK')
                {
                  this.questionList = user_question['Favourite'];
                  
                }else if(user_question['Status']==='403')
                {
                  super.showToast(this.toast,user_question['StatusContent']);
                  this.navCtrl.parent.select(4);
                }else{
                  super.showToast(this.toast,user_question['StatusContent']);
   
                }

                loading.dismiss();
                
              }, error => this.errorMessage = <any>error);
          }

        })
      }else{
        super.showToast(this.toast,'您还没有登录');
      }

    })


  }


  gotoDetails(id){
    this.navCtrl.push(DetailsPage,{'id':id});
  }

}
