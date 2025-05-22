import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Iproduct } from '../../models/products.model';
@Component({
  selector: 'app-products-showcase',
  templateUrl: './products-showcase.component.html',
  styleUrls: ['./products-showcase.component.scss'],
})
export class ProductsShowcaseComponent implements OnInit {
  @Input() productsArr!: Array<Iproduct>;

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  private intervalId: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.startAutoScroll();
  }

  startAutoScroll() {
    this.intervalId = setInterval(() => {
      const el = this.scrollContainer.nativeElement;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        // Jump instantly back to start without animation
        el.scrollLeft = 0;
      } else {
        // Scroll a little bit right smoothly
        el.scrollLeft += 2;
      }
    }, 20);
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -250,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 250,
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
