import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
})
export class CountdownTimerComponent implements OnInit {
  timeLeft = 0;
  interval: any;

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  // Set your target flash sale end date here
  targetDate = new Date('2025-05-25T23:59:59');
  flashSales: any;

  constructor() {}

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown() {
    this.interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = this.targetDate.getTime() - now;

      this.timeLeft = distance;

      if (distance <= 0) {
        clearInterval(this.interval);
        this.timeLeft = 0;
      } else {
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      }
    }, 1000);
  }

  formatNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
