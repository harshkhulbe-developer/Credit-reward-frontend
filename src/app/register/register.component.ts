import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private service:RegisterService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  
    });
  }

  onSubmit() {
    console.log("submit clicked",);
    
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      let data={
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        phoneNo: this.registerForm.value.phoneNo,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      }
      this.service.userRegister(data).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['login']);
          // Handle successful registration (e.g., navigate to login, display success message)
          
        },
        (error) => {
          console.error('Registration failed:', error);
          // Handle registration errors (e.g., display error message to user)
        }
      );

    }
  }
}
