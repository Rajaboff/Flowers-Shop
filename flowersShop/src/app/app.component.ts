import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  totalPrice = 0;
  list: any = [];

  editing = false;
  adding = false;
  cart = false;

  id: any = 1;

  flowers: any[] = [];

  imgLength = 0;

  curFlower: any = {};


  constructor(fireData: AngularFireDatabase) {

    const itemRef: AngularFireList<any> = fireData.list("/");

    itemRef.valueChanges().subscribe(
      x => {
        let aaa: number[] = [];
        this.flowers = x;

        if (x.length == 0) {
          this.id = 1;
        }
        
        else {
          this.flowers.forEach(x => aaa.push(x.id));
          aaa.sort((a, b) => b - a)
          this.id = aaa[0];
        }

        console.log(this.id);
      }
    );
  }

  addToCart(val: any) {
    val.totalCount += val.count;
    this.totalPrice += val.count * val.price;
    val.sel = true;
  }

  changeCount() {
    let total = 0;
    this.flowers.forEach(i => {
      if (i.sel == true) {
        total += i.totalCount * i.price;
      }
    })
    this.totalPrice = total;
  }

  delItem(val: any) {
    this.totalPrice -= val.price * val.totalCount;
    val.totalCount = 0;
  }

  deleted(val: any) {
    this.editing = !val;
  }

  editingClick(val: any) {
    this.editing = val[1];
    this.adding = false;
    this.cart = false;
    this.curFlower = val[0];
  }

  addingClick(val: any) {
    this.adding = val;
  }

  cartClick(val: any) {
    this.cart = val;
  }

  backClick(val: any) {
    this.adding = val[0];
    this.cart = val[1];
    this.editing = val[2];
  }
}
