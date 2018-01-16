import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FavoriatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favoriate',
  templateUrl: 'favoriate.html',
})
export class FavoriatePage {


  type:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.type = 'favouriate';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoriatePage');
  }

}
