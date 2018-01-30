import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';

/**
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage {



  @ViewChild('areaInput') areaInput: ElementRef; //获取前台的输入框
  @ViewChild('textarea') areatext:ElementRef;

  title:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public renderer: Renderer2
  ) {
  }

  ionViewDidLoad() {
  
  }



  submit(){
    const url = "http://192.168.1.111:3500/myappAuth/getimg/19-014845_297.jpg";
    const parent = this.areaInput.nativeElement;
    const divparent = this.renderer.createElement('p');
    const imgcreate = this.renderer.createElement('img');
    const brcreate = this.renderer.createElement('br');
    //this.renderer.setAttribute(parent,'rows','5');
    this.renderer.setAttribute(imgcreate,'src',url);
    this.renderer.setAttribute(imgcreate,'width','100%');
    this.renderer.setAttribute(imgcreate,'height','auto');
    console.log(this.title);
    this.renderer.appendChild(parent,divparent);
    this.renderer.appendChild(divparent,imgcreate);
    this.renderer.appendChild(parent,brcreate);
    

    console.log(this.areaInput.nativeElement);

    console.log(this.areaInput.nativeElement.innerHTML);
   
  }



}
