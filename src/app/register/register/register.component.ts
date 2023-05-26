import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  public step: number = 0;

  constructor(
    private router: Router) {
  }

  ngOnInit(): void {

  }

  register(): void{
    this.router.navigate(['/home/candidate']).then()
  }
}
