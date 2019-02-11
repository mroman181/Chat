import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }
  
  ngOnInit() {
  }

  private createForm(): void {
    this.signupForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
 
  public submit(): void {
    // TODO call the auth service
    const {firstname, lastname, email, password} = this.signupForm.value;
    console.log(`Firstname: ${firstname}, Lastname: ${lastname}, Email: ${email}, Password: ${password}`);
  }

}
