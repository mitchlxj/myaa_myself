import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharePage } from './share';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    SharePage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(SharePage),
  ],
})
export class SharePageModule {}
