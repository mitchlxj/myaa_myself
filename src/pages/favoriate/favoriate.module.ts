import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoriatePage } from './favoriate';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FavoriatePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(FavoriatePage),
  ],
})
export class FavoriatePageModule {}
