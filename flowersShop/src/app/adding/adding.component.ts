import { Component, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import { AngularFireDatabase } from '@angular/fire/database'

@Component({
  selector: 'app-adding',
  templateUrl: './adding.component.html',
  styleUrls: ['./adding.component.css']
})
export class AddingComponent {

  path: string = '';
  imagePath: string = '';
  imgName: string = '';
  
  added: boolean = false;

  @Input() flowers: any[] = [];
  @Input() id: number = 1;
  title: string = 'Flower';
  maxCount: number = 1;
  count: number = 1;
  price: number = 10;

  fileText: string = 'Выберите изображение';

  progress: any = 0;

  imgUrl = '';

  constructor(public af: AngularFireStorage, private afd: AngularFireDatabase) { }

  upload(val: any, btn: any) {
    this.path = val.target.files[0];
    this.imagePath = URL.createObjectURL(val.target.files[0]);
    this.fileText = "Изображение выбрано";
    btn.style.background = "black";
    btn.style.color = "white";
    this.imgName = val.target.files[0].name;
  }

  uploadImage() {
    if (this.path != '') {
      this.af.upload(this.imgName, this.path).percentageChanges().subscribe((resp) => {
        this.progress = resp?.toFixed()+"%";
        this.added = true;
      }, (err) => {}, () => {
        this.af.storage.ref().child(this.imgName).getDownloadURL().then(url => { this.afd.list("/").set(this.id.toString(), { "id": this.id, "title": this.title, "count": this.count, "img": this.imgName, "totalCount": 0, "price": this.price, "sel": false, "urlImg": url, "maxCount": this.maxCount }) });
        this.progress = "Товар добавлен :)";
        this.id++;
      });
    }
  }

  changeInfo() {
    this.added = false;
  }
}
