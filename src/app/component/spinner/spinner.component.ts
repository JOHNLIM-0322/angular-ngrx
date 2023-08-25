import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getspinnerstate } from 'src/app/store/common/app.selector';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  isLoaded = false;

  constructor(private store: Store){}

  ngOnInit(): void {
    this.store.select(getspinnerstate).subscribe(res => {
      this.isLoaded = res;
    });
  }
}
