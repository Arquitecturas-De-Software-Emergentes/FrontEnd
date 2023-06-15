import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RegisterService} from "../register.service";
import {PostulantRegisterRequest} from "../../request/postulantRegisterRequest";
import {FormControl} from "@angular/forms";
import Swal from 'sweetalert2'
import {CompanyRegisterRequest} from "../../request/companyRegisterRequest";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  email = new FormControl('');
  password = new FormControl('');
  confirmPassword = new FormControl('');
  loading = false;
  public step: number = 0;
  public postulantRegister: PostulantRegisterRequest = {
    email: '',
    password: '',
    confirmPassword: '',
    roleId: 1
  };
  public companyRegister: CompanyRegisterRequest = {
    email: '',
    password: '',
    confirmPassword: '',
    roleId: 2
  };
  constructor(
    private router: Router, private registerService: RegisterService) {
  }

  ngOnInit(): void {
  }

  onPostulantRegister(): void{
    this.loading = true;
    this.postulantRegister.email = this.email.value? this.email.value: '';
    this.postulantRegister.password = this.password.value? this.password.value: '';
    this.postulantRegister.confirmPassword = this.confirmPassword.value? this.confirmPassword.value: '';
    this.postulantRegister.roleId = 1;

    this.registerService.PostulantRegister(this.postulantRegister).subscribe(res =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Postulante creado exitosamente',
        showConfirmButton: false,
        timer: 1500
      })
      this.loading = false;
      this.router.navigate(['/login/postulant']).then()
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ah ocurrido un error al crear al postulante',
        showConfirmButton: false,
        timer: 1500
      })
      this.loading = false;
    })
  }
  onCompanyRegister(): void{
    this.loading = true;
    this.companyRegister.email = this.email.value? this.email.value: '';
    this.companyRegister.password = this.password.value? this.password.value: '';
    this.companyRegister.confirmPassword = this.confirmPassword.value? this.confirmPassword.value: '';
    this.companyRegister.roleId = 2;

    this.registerService.CompanyRegister(this.companyRegister).subscribe(res =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Empleador creado exitosamente',
        showConfirmButton: false,
        timer: 1500
      })
      this.loading = false;
      this.router.navigate(['/login/employer']).then()
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ah ocurrido un error al crear al empleador',
        showConfirmButton: false,
        timer: 1500
      })
      this.loading = false;
    })
  }

}
