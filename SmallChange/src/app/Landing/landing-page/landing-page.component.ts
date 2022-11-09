import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private user:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['/login']);
  }

  register(){
    this.router.navigate(['/register']);
  }

}
