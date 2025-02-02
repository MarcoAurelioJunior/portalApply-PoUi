import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Usuarios } from '../../Interfaces/usuarios';
import { HttpClient } from '@angular/common/http';
import { ActiveService } from './active.service';
import { Active } from '../../Interfaces/active';
import { HomeComponent } from '../../Components/home/home.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  #http = inject(HttpClient)
  
  constructor() { 
    
  }

  // Exemplo de service utilizando o OBSERVABLE, quando eu chamar o inject em outra classe
  // Eu teria que colocar o subscribe para resgatar a requisição
  
  // public getUsuarios(): Observable<Array<Usuarios>> {
  //   const usuarios: Usuarios[] = [];
  
  //   return const req = this.#http.get(environment.usuarios);
  // }

  public getUsuarios(): Promise<Array<Usuarios>> {
    return new Promise((resolve, reject) => {

      
      const usuarios: Usuarios[] = [];
  
      // Fazendo a requisição HTTP
      const req = this.#http.get(environment.usuarios);
  
      // Assinando a requisição
      req.subscribe({
        next: (dados: any) => {
          // Iterando sobre os dados recebidos
          dados.forEach((el: any) => {
            usuarios.push({
              name: el.name,
              disabled: el.disabled,
              address: el['last-caller-id'],
              lastLog: el['last-logged-out'],
              password: el.password,
              profile: el.profile,
            });
          });
        },
        error: (err: any) => {
          console.error('Erro ao buscar usuários:', err);
          reject(err); // Rejeita a promessa em caso de erro
        },
        complete: () => {
          console.log('Requisição completa.');
          resolve(usuarios); // Resolve a promessa ao final
        },
      });
    });
  }
  

}
