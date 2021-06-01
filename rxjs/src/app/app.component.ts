import { Component } from '@angular/core';
import { of } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxjs';

  /**
   *
   */
  constructor() {
    
    const values = of("ibrahim",1,2, [1,2,3,4]);

    values.subscribe(data=> {
      console.log(data);
    });
  }

}
