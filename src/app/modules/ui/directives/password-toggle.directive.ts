import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPasswordToggle]',
})
export class PasswordToggleDirective implements OnInit {
  @Input()
  appPasswordToggle: HTMLElement;
  private show = false;

  constructor(private renderer: Renderer2, private element: ElementRef) {}

  @HostBinding('attr.type')
  type = 'password';

  @HostListener('click')
  onClick() {
    this.show = !this.show;
    this.type = this.show ? `text` : `password`;

    this.renderer.setAttribute(this.appPasswordToggle, 'type', this.type);
  }

  ngOnInit() {
    this.renderer.addClass(this.element.nativeElement, 'lock');
  }
}
