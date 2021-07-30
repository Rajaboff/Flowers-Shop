import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent{

  @Input() totalPrice: number = 0;
  @Input() listFlower: any[] = [];
  @Output() countItem = new EventEmitter<number>();
  @Output() delItem = new EventEmitter<any>();

  delFromCart(i: any) {
    i.sel = false;
    this.delItem.emit(i)
  }

  changeCount() {
    this.countItem.emit();
  }

}
