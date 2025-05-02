import { Component, inject, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoPageLoginComponent, PoPageLoginModule } from '@po-ui/ng-templates';
import { AllUsers } from '../../Services/users/AllUsers.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { Auth } from '../../Services/auth/oauth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PoPageLoginModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  #users = inject(AllUsers)
  router = inject(Router)

  private loginService = inject(Auth)

  private login: string = ''
  private password: string = ''
  private profile: string = ''

  constructor(
    private notif: PoNotificationService
  ){}

  ngOnInit(){
    this.notif.setDefaultDuration(3000)
  }

  async onLoginSubmit(login: PoPageLoginComponent){
    const allUsers = await this.#users.cruzaInfosIp()
    
    const isValidUser = allUsers.some(
      el => el.name.toLowerCase() === login.login.toLowerCase() && el.password === login.password
    );

    const isAdmUser = allUsers.find(el=> el.name === login.login && el.password === login.password)

    this.profile = isAdmUser.profile

    if(isValidUser){
      sessionStorage.setItem('username', login.login)
      sessionStorage.setItem('password', login.password)
      sessionStorage.setItem('profile', this.profile)
      
      this.notif.success('Logado com sucesso! Bem vindo ' + login.login)
      this.router.navigate(['/home']) 
    }else{
      this.notif.error('Usuário ou senha incorretos! tente novamente')

    }
  }
  
}
