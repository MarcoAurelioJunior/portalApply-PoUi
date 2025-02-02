import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdatePassword {

  constructor() { }

  #http = inject(HttpClient)

  public async UpdatePass(name: any, newPass: any): Promise<any> {
    const bodyReq = {
        name: name,
        password: newPass
    };

    console.log(bodyReq); // Log para depuração

    // Configura o cliente para esperar texto puro na resposta
    return this.#http.post(environment.updatePass, bodyReq, { responseType: 'text' })
        .toPromise()
        .catch((err) => {
            console.error("Erro ao bloquear usuário:", err);
            throw err; // Rejeita a promessa com o erro para tratar posteriormente
        });
}

  
}
