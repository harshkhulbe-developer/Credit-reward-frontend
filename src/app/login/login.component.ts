import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  

  constructor(private formBuilder: FormBuilder,
    private router: Router,private service: LoginService) { }

  loginForm: FormGroup;


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }



  

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // You can add further logic like calling an authentication service here
      const data = {
        email:this.loginForm.value.email,
        password:this.loginForm.value.password,
      }

      this.service.userLogin(data).subscribe(
        (response) => {
          console.log('Login successful: ',response);
          this.router.navigate(['home'])
        },
        (error) => {
          console.log("Error while login: ",error);
        }
      )
    }
  }
}
