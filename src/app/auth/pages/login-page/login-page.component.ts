import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(private http:AuthService, private router: Router){}


  onLogin(){
    this.http.login('fernando@gmail.com','123')
      .subscribe((resp) => {
        this.router.navigate(['/']);
      });
  }
}
