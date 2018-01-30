import { Directive } from '@angular/core';
import { HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';

/**
 * Generated class for the ScrollDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[scroll]' // Attribute selector
})
export class ScrollDirective {

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
  ) {
    console.log('scroll directive');
  }

  @HostListener('input', ['$event']) 
  onScroll(ev: Event) {
    let height = this.el.nativeElement.scrollHeight;
    let height2 = this.el.nativeElement.clientHeight;
    let height3 = this.el.nativeElement.offsetHeight;
    console.log(height);
    console.log(height2);
    console.log(height3);

    this.rd.setStyle(this.el.nativeElement,'height',height);
  }
  @HostListener('focus', ['$event'])
  onFocus(ev: Event) {
    console.log('光标出现');
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(ev: Event) {
    console.log('onmousedown');
  }

  @HostListener('click', ['$event'])
  onClick(ev: Event) {
    console.log('onclick');
  }

}
