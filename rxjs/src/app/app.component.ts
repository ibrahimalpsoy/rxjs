import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { defer, from, fromEvent, interval, of, range, timer } from "rxjs";
import { ajax } from "rxjs/ajax";
import { debounceTime, distinct, distinctUntilChanged, filter, map } from "rxjs/operators";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'rxjs';
  subscription;

  // @ViewChild("btn") //html içindeki referansı aldı. compile edildiğinde html tarafındaki elementi burdaki (myButton) ile eşleşiyor
  // myButton: ElementRef

  // ngAfterViewInit(): void {
  //   fromEvent(this.myButton.nativeElement, "click").subscribe(data => {
  //     console.log(data);
  //   });
  // }

  @ViewChild("txtSearch")
  myText: ElementRef


  ngAfterViewInit(): void {
    fromEvent<KeyboardEvent>(this.myText.nativeElement, "keyup")
      .pipe(debounceTime(500),)
      .subscribe(data => { console.log((data.target as HTMLInputElement).value); });
  }


  constructor() {

    //this.ofOperation(); // içindeki herneyse bunu observable olarak döner 
    //this.intervalOperator(); 
    //this.timerOprationAndunsubcribe(); 
    //this.rangeOperator(); 
    //this.fromOperator();
    //this.deferOparator();
    //this.ajaxOparetor();
    //this.filterOparator();
    //this.distictUntilChangeOparator();
    const numbers = from([1, 2, 3, 4, 54, 6]);

    numbers.pipe(map(data => data + 2)).subscribe(data => console.log(data))


  }


  private distictUntilChangeOparator() {
    const distinctUntilOpr = from([1, 2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 10]);

    distinctUntilOpr.pipe(distinctUntilChanged()).subscribe(data => {

      console.log(data);
    });
  }

  private filterOparator() {
    const myArray = from([1, 2, 3, 4, 5, 6, 7, 88, 99, 11, 22, 333, 4456]);

    myArray.pipe(filter(val => val > 7)).subscribe(data => {
      console.log(data);
    });
  }

  private ajaxOparetor() {
    ajax.getJSON("https://jsonplaceholder.typicode.com/users").subscribe(data => {
      // console.log(`${data[0].name}`);
      console.table(data);
    }, err => { }, () => {
      console.log("veriler geldi iyimi");
    });
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
    //this.subscription.unsubscribe();
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
