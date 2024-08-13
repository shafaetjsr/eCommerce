import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  
  showForm1: boolean = true; 

  showForm2() {
    this.showForm1 = false;
  }

  showFsorm1() {
    this.showForm1 = true;
  }

}
