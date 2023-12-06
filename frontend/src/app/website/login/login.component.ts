import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  private formBuilder:FormBuilder = inject(FormBuilder)
  private usersService: UsersService = inject(UsersService)
  private router:Router = inject(Router)

  loginForm: FormGroup;
  
  constructor() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  handleLogin() {
    this.usersService.login(this.loginForm.value).subscribe((resp:any) => {
      this.router.navigate([`${ resp.type }`])
    })
  }

}
