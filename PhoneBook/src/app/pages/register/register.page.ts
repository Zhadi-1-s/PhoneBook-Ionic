import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public authService: AuthenticationService, public router: Router) { }

  ngOnInit() {
  }

  signUp(email: any, password: any){
    this.authService
      .RegisterUser(email.value, password.value)
      .then((res) => {
        window.alert('user created succesfully')
        this.router.navigate(['dashboard'])
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

 

}
