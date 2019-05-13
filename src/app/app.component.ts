import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    // Com essa Observable toda vez que usuário logar ou deslogar ele irá para página que estava antes
    auth.user$.subscribe(user => {
      if(user){
// tslint:disable-next-line: prefer-const
// tslint:disable-next-line: max-line-length
        // Como não foi implementado um formulário de cadastro, não tenho como salvar o usuário para isso eu salvo o usuário no banco de dados toda vez que ele loga
        userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    });
  }
}
