import { Component ,forwardRef} from '@angular/core';
import { EmojiProvider } from '../../providers/emoji/emoji';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * Generated class for the EmojipickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'emojipicker',
  templateUrl: 'emojipicker.html',
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>EmojipickerComponent),
      multi:true
    }
  ]
})
export class EmojipickerComponent implements ControlValueAccessor {
 

  emojiArray = [];

  content:string = '';

  onChanged: Function;

  onTouched: Function;

  constructor(
    public emojiProvider: EmojiProvider
  ) {
    this.emojiArray = this.emojiProvider.getEmojis();
  }



  writeValue(obj: any): void {
   this.content = obj;
  }
  registerOnChange(fn: any): void {
   this.onChanged = fn;
   this.setValue(this.content);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setValue(val:string):any{
    this.content+=val;
    if(this.content){
      this.onChanged(this.content);
    }
  }
 

}
