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
  private resumeTimeout: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.startAutoScroll();
  }

  startAutoScroll() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      const el = this.scrollContainer.nativeElement;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
       
        el.scrollLeft = 0;
      } else {
        
        el.scrollLeft += 2;
      }
    }, 20);
  }

  scrollLeft() {
    clearInterval(this.intervalId);
    clearTimeout(this.resumeTimeout);

    this.scrollContainer.nativeElement.scrollBy({
      left: -250,
      behavior: 'smooth',
    });

    this.resumeTimeout = setTimeout(() => {
      this.startAutoScroll();
    }, 3000);
  }

  scrollRight() {
    clearInterval(this.intervalId);
    clearTimeout(this.resumeTimeout);

    this.scrollContainer.nativeElement.scrollBy({
      left: 250,
      behavior: 'smooth',
    });

    this.resumeTimeout = setTimeout(() => {
      this.startAutoScroll();
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    clearTimeout(this.resumeTimeout);
  }
}
