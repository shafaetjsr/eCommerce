import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSelectionServiceService {
  
  private selectedProductSource = new BehaviorSubject<string | null>(null);
  selectedProduct$ = this.selectedProductSource.asObservable();

  selectProduct(product: string) {
    this.selectedProductSource.next(product);
  }
}
