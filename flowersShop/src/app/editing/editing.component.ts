import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.css']
})
export class EditingComponent implements OnInit {

  path: string = '';
  imagePath: string = '';
  imgName: string = '';

  fileText: string = 'Выберите изображение';

  @Input() flower: any = {};
  @Output() deleted = new EventEmitter<any>();

  progress: any = 0;

  added: boolean = false;

  title = '';
  maxCount = 0;
  price = 0;
  count = 1;

  del: boolean = false;

  constructor(public af: AngularFireStorage, private afd: AngularFireDatabase) {}

  ngOnInit() {
    this.title = this.flower.title;
    this.maxCount = this.flower.maxCount;
    this.price = this.flower.price;
    this.imagePath = this.flower.urlImg;
  }

  deletedItem() {
    this.del = true;
    this.deleted.emit(this.del);
  }

  upload(val: any, btn: any) {
    this.path = val.target.files[0];
    this.imagePath = URL.createObjectURL(val.target.files[0]);
    this.fileText = "Изображение выбрано";
    btn.style.background = "black";
    btn.style.color = "white";
    this.imgName = val.target.files[0].name;    
  }

  UpdateData() {
    if (this.path != '') {
      this.af.upload(this.imgName, this.path).percentageChanges().subscribe((resp) => {
        this.progress = resp?.toFixed()+"%";
        this.added = true;
      }, (err) => {}, () => {
        this.af.storage.ref().child(this.imgName).getDownloadURL().then(url => { 
          this.af.storage.refFromURL(this.flower.urlImg).delete();
          this.afd.database.ref("/"+this.flower.id).update({
            title: this.title,
            maxCount: this.maxCount,
            price: this.price,
            img: this.imgName,
            urlImg: url
          });
        });
        this.progress = "Товар изменён :)";
      });
    }
    else {
      this.afd.database.ref("/"+this.flower.id).update({
        title: this.title,
        maxCount: this.maxCount,
        price: this.price,
        img: this.imgName,
        urlImg: this.flower.urlImg
      });
      this.added = true;
      this.progress = "Товар изменён :)";
    }
  }

  changeInfo() {
    this.added = false;
  }

  deleteItem() {
    this.af.storage.refFromURL(this.flower.urlImg).delete();
    this.afd.database.ref().child('/'+this.flower.id).remove();
  }
}
