import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent{

  @Output() addCart = new EventEmitter<number>();
  @Output() editingCl = new EventEmitter<any>();

  @Input() flowers: any[] = [];

  editing = true;

  addToCart(val: any) {
    this.addCart.emit(val);  
  }

  editBtn(val: any, en: boolean) {
    val.editBtn = en;
  }

  editingClick(val: any){
    this.editingCl.emit([val, this.editing]);
  }
}
