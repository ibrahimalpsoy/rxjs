import { Component } from '@angular/core';
import { defer, from, interval, of, range, timer } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxjs';
  subscription;

  constructor() {

    //this.ofOperation(); // içindeki herneyse bunu observable olarak döner
    //this.intervalOperator();
    //this.timerOprationAndunsubcribe();
    //this.rangeOperator(); 
    //this.fromOperator();
    //this.deferOparator();



  }

  private deferOparator() {
    
    const deferOpr = of(new Date()); // subscribe olunduğunda oluşturulduğu andaki tarihi verir
    const deferOpr2 = defer(() => of(new Date())); // ne zaman çağırılırsa ozamanki tarihi verir.

    const timerOpr = timer(3000);

    timerOpr.subscribe(data => {
      deferOpr.subscribe(val => console.log("of=> gelen data " + val));
      deferOpr2.subscribe(val => console.log("defer=> gelen data  " + val));
    });
  }

  private fromOperator() {  // içersine dizi alır. observable nesneye dönüştürür. dizin içindeki değerleri okuyabiliriz.
    const map = new Map();

    map.set(1, "Kitaplar");
    map.set(2, "Kalemler");

    const fromOpr = from(map);

    this.subscription = fromOpr.subscribe((val) => {
      console.log(`${val[0]} = ${val[1]}`);
    }, err => { }, () => { });
  }

  private rangeOperator() {
    const rangeOpr = range(1, 20); //! 1 den 20 ye kadar değerleri yayar

    this.subscription = rangeOpr.subscribe(
      (val) => {
        console.log("gelen değer " + val);
      },
      err => { },
      () => {
        console.log("veri alma işlemi tamamlandı");
      }
    );
  }

  private timerOprationAndunsubcribe() {

    const timerOpr = timer(4000, 1000); //!4 saniye sonra her 2 sn de bir değer yay!

    this.subscription = timerOpr.subscribe((data) => {
      console.log("iki saniye sonra başlayacak " + data + 1);
    }, err => { }, () => {
      console.log("veri akışı tamamlandı");
    });
  }

  stopTimer() {
    this.subscription.unsubscribe();
  }

  private intervalOperator() {

    const intervalOpr = interval(1000);

    intervalOpr.subscribe(
      val => {
        console.log("ibrahim " + val);
      },
      err => { },
      () => {
        console.log("complated alanı... veri alma işlemi bitti.");
      }

    );
  }

  private ofOperation() {
    const values = of("ibrahim", 1, 2, [1, 2, 3, 4]); // içerisinde her türlü veri alır.

    values.subscribe(data => {
      console.log(data);
    });
  }
}
