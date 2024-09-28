import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { addIcons } from 'ionicons';
import { library, homeSharp, radio, search } from 'ionicons/icons';

@Component({
  selector: 'tab-menu-mobile',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
})
export class TabMenuMobile implements OnInit {
  constructor() {
    /**
     * Any icons you want to use in your application
     * can be registered in app.component.ts and then
     * referenced by name anywhere in your application.
     */
    addIcons({ library, homeSharp, radio, search });
  }
  ngOnInit(): void {}
}
