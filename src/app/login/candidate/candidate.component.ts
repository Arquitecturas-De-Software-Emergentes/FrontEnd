import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PostulantRegisterRequest} from "../../request/postulantRegisterRequest";
import {SignInFormRequest} from "../../request/signInFormRequest";
import {LoginService} from "../login.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent {
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

    this.loginService.candidateSignIn(this.signInFormRequest).subscribe(res =>{
      this.loading = false;
      let response:any = [];
      response = res;
      if(response == null){
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
        sessionStorage.setItem('userId', response[0].id)
        sessionStorage.setItem('role', response[0].roleId)
        if(response[0].firstName!='' || response[0].lastName!=''){
          sessionStorage.setItem('name', `${response[0].firstName} ${response[0].lastName}`)
        }

        this.router.navigate(['/home/candidate']).then()
      }
    })
  }


  onRegister(): void{
    this.router.navigate(['/register']).then()
  }
}
