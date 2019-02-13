import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertType } from './../../enums/alert-type.enum';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Alert } from './../../classes/alert';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(private fb: FormBuilder, private alertService: AlertService, private loadingService: LoadingService) {
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

    this.loadingService.isLoading.next(true);
    // TODO call the auth service
    if (this.signupForm.valid) {
      const { firstname, lastname, email, password } = this.signupForm.value;
      console.log(`Firstname: ${firstname}, Lastname: ${lastname}, Email: ${email}, Password: ${password}`);
      this.loadingService.isLoading.next(false);

    } else {
      const failedLoginAlert = new Alert("Your email or password were invalid, try again", AlertType.Danger);
      setTimeout(() => {
        this.loadingService.isLoading.next(false);
        this.alertService.alerts.next(failedLoginAlert);
      }, 2000);
    }
  }

}
