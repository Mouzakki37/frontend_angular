import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  signupForm : FormGroup; 
  hidePassword = true;
  
  constructor( private fb : FormBuilder,
    private SnackBar : MatSnackBar,
    private authService: AuthService,
    private router : Router){
    
    }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],



  })

}

togglePasswordVisibility(){
  this.hidePassword = !this.hidePassword;
}

onSubmit(): void {
  const password = this.signupForm.get('password')?.value;
  const confirmPassword = this.signupForm.get('confirmPassword')?.value;

  if(password !== confirmPassword){
    this.SnackBar.open('Password do not match.', 'close', { duration:  5000, panelClass: 'error-snackbar' });
    return;
  }

  this.authService.register(this.signupForm.value).subscribe(
    (response)  => {
      this.SnackBar.open('Sign up successful', 'close', { duration: 5000});
      this.router.navigateByUrl("/login");
      
    },
    (error) =>{
      this.SnackBar.open('Sign up failed, Please try again.', 'close', {duration : 5000, panelClass: 'error-snackBar'});

    }
    )
  

}

}

