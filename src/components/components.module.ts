import { NgModule } from '@angular/core';
import { QuestionComponent } from './question/question';
import { IonicPageModule } from 'ionic-angular';
import { EmojipickerComponent } from './emojipicker/emojipicker';
@NgModule({
	declarations: [
		QuestionComponent,
		EmojipickerComponent
	],
	imports: [
		IonicPageModule.forChild(QuestionComponent),
		IonicPageModule.forChild(EmojipickerComponent),
	],
	exports: [
		QuestionComponent,
		EmojipickerComponent
	]
})
export class ComponentsModule { }
