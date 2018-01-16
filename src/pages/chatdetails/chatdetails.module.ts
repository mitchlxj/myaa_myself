import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatdetailsPage } from './chatdetails';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ChatdetailsPage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    IonicPageModule.forChild(ChatdetailsPage),
  ],
})
export class ChatdetailsPageModule {}
