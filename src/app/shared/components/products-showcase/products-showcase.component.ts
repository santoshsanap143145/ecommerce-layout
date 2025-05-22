import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Iproduct } from '../../models/products.model';

@Component({
  selector: 'app-products-showcase',
  templateUrl: './products-showcase.component.html',
  styleUrls: ['./products-showcase.component.scss']
})
export class ProductsShowcaseComponent implements OnInit, OnDestroy {
  @Input() productsArr: Iproduct[] = []; // Populate this from your parent or service

  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;

  private scrollIntervalId: any;
  private scrollSpeedMs = 60; // time between scroll steps
  private scrollStepPx = 4;   // px scrolled per interval
  private isPaused = false;

  ngOnInit(): void {
    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
  }

  startAutoScroll() {
    this.scrollIntervalId = setInterval(() => {
      if (!this.isPaused && this.scrollContainer?.nativeElement) {
        this.scrollContainer.nativeElement.scrollLeft += this.scrollStepPx;
      }
    }, this.scrollSpeedMs);
  }

  stopAutoScroll() {
    if (this.scrollIntervalId) {
      clearInterval(this.scrollIntervalId);
      this.scrollIntervalId = null;
    }
  }

  onMouseEnter() {
    this.isPaused = true;
  }

  onMouseLeave() {
    this.isPaused = false;
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollLeft -= 200;
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollLeft += 200;
  }
}
