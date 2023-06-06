import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../login.service";
import {SignInFormRequest} from "../../request/signInFormRequest";
import Swal from "sweetalert2";

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent {
  email = new FormControl('');
  password = new FormControl('');
  loading = false;
  constructor(private router: Router,
              private loginService: LoginService) {
  }
  ngOnInit() {

  }
  public signInFormRequest: SignInFormRequest = {
    email: '',
    password: ''
  };

  onSignIn(): void{
    this.loading = true;
    this.signInFormRequest.email = this.email.value? this.email.value: '';
    this.signInFormRequest.password = this.password.value? this.password.value: '';

    this.loginService.employerSignIn(this.signInFormRequest).subscribe(res =>{
      this.loading = false;
      if(res.warning){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ah ocurrido un error al validar las credenciales',
          showConfirmButton: false,
          timer: 1500
        })
        this.loading = false;
      } else {
        this.loading = false;
        sessionStorage.setItem('userId', res.data.company.id)
        sessionStorage.setItem('role', res.data.company.roleId)
        sessionStorage.setItem('name', res.data.company.companyName)
        this.router.navigate(['/home/employer']).then()
      }
    })
  }


  onRegister(): void{
    this.router.navigate(['/register']).then()
  }
}
