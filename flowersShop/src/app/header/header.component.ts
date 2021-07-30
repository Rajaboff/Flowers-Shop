import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() totalPrice: number = 0;
  @Input() editing: boolean = false;

  adding = false;
  cart = false;
  back = true;

  @Output() addingCl = new EventEmitter<boolean>();
  @Output() cartCl = new EventEmitter<boolean>();
  @Output() backCl = new EventEmitter<any>();


  addingClick() {
    this.adding = true;
    this.editing = false;
    this.cart = false;
    this.back = false;
    this.addingCl.emit(this.adding);
  }

  cartClick() {
    this.cart = true;
    this.editing = false;
    this.adding = false;
    this.back = false;
    this.cartCl.emit(this.cart);
  }

  backClick() {
    this.back = true;
    this.cart = false;
    this.adding = false;
    this.editing = false;
    this.backCl.emit([this.adding, this.cart]);
  }
}
