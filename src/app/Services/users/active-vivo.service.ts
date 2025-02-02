import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Active } from '../../Interfaces/active';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ActiveVivoService {

  constructor() { }

  #http = inject(HttpClient)

  public getUsuariosAtivosVivo(): Promise<Array<Active>>{
    return new Promise((resolve, reject) => {
      let usuarios: Array<Active> = [];
      const req = this.#http.get(environment.usuariosAtivosVivo);

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
    })
  }

  
}
