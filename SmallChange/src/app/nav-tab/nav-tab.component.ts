import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.scss']
})
export class NavTabComponent implements OnInit {

  active = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
