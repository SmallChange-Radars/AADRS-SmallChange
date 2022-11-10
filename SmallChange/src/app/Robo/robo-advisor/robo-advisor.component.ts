import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-robo-advisor',
  templateUrl: './robo-advisor.component.html',
  styleUrls: ['./robo-advisor.component.scss']
})
export class RoboAdvisorComponent implements OnInit {

  clicked: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onChosen(){
    this.clicked = true;
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

}
