import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  hide = true;
  public loginForm: FormGroup;
  public submitted: Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }
  register(): void{
    this.router.navigate(['/register']).then()
  }
  signIn(): void{
    this.router.navigate(['/profile']).then()
  }
  onSubmit(): void {
    this.submitted = true;
    if(this.loginForm.valid){
      let email: string = this.loginForm.value.email;
      let password: string = this.loginForm.value.password;
      console.log("click login")

    }
  }

}
