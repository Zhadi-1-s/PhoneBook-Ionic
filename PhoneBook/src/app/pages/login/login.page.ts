import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public authService: AuthenticationService, public router: Router) { }

  ngOnInit() {
  }

  logIn(email:any, password:any){
    this.authService.SignIn(email, password)
    .then(():any => {
      this.router.navigate(['dashboard']);
    })
    .catch((error) => {
      window.alert(error.message)
    })
  }

  navigateToRegister(){
    this.router.navigate(['register'])
  }

}
