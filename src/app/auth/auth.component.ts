import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  isSubmitted = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      id: ['', Validators.required],
      passwd: ['', Validators.required]
    });
  }

  get formControls() {
    return this.authForm.controls;
  }

  signIn() {
    this.isSubmitted = true;
    console.log('log in button');
    if (this.authForm.invalid) {
      return;
    }
    this.authService.signIn(this.authForm.value).subscribe((res) => {
      console.log(res)
      this.router.navigateByUrl('/kunde/home').then(() => console.log('navigated'));
    });
  }
}
