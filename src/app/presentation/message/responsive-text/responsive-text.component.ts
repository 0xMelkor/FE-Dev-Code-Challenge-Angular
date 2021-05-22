import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-responsive-text',
  templateUrl: './responsive-text.component.html'
})
export class ResponsiveTextComponent implements AfterViewInit {

  @Input()
  text

  @ViewChild('msgText')
  msgTextEl: ElementRef;

  textOverflowed: boolean;
  collapsed: boolean;

  constructor(private cdr: ChangeDetectorRef) {
    this.textOverflowed = false;
  }

  ngAfterViewInit(): void {
    this.clamp();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.clamp();
  }

  private clamp() {
    this.textOverflowed = false;
    this.cdr.detectChanges();
    this.textOverflowed = this.linesNum() > 3;
    this.collapsed = this.textOverflowed;
    this.cdr.detectChanges();
  }

  private linesNum(): number {
    const el = this.msgTextEl.nativeElement;
    const style = window.getComputedStyle(el);
    const textHeight: number = el.offsetHeight;
    const lineHeight: number = Number(style.lineHeight.replace('px', ''));
    return (textHeight / lineHeight);
  }

}
