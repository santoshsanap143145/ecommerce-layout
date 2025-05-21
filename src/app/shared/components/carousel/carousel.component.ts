import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Iproduct } from '../../models/products.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() topRatedProducts: Iproduct[] = [];

  currentSlide: number = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.topRatedProducts.length;
    }, 3000);
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
