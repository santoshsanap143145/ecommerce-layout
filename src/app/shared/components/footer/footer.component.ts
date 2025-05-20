import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  email: string = '';

 nstructor() { }

  ngOnInit(): void {
  }

   onSubscribe() {
    if (this.email) {
      console.log('Subscribed with:', this.email);
      // Ideally send email to backend
      this.email = '';
    }
  }
}
