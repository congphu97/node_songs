// main-view.component.ts
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {

  constructor() { }

  ngOnInit(): void { }

  openProfile() {
    console.log('runninggg open profile')
  }
}
