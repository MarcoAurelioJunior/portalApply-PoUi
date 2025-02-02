import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Active } from '../../Interfaces/active';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ActiveService {

  #http = inject(HttpClient)
  
  constructor() { 
    
  }

  public getUsuariosAtivos(): Promise<Array<Active>> {
    return new Promise((resolve, reject) => {
      let usuarios: Array<Active> = [];
      let req = this.#http.get(environment.usuariosAtivos);
      
      let sub = {
        next(dados: any) {
          dados.forEach((el: any) => {
            usuarios.push({
              disabled: 'false',
              address: el.address,
              name: el.name,
              online: 'yes'
            });
          });
        },
        error(err: any) {
          reject(`Error: ${err}`);
        },
        complete() {
          resolve(usuarios); // Resolve a Promise com os dados após a requisição ser concluída
        }
      };
  
      req.subscribe(sub);
    });
  }
  
}
