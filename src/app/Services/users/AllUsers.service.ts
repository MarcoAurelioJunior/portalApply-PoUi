import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Usuarios } from '../../Interfaces/usuarios';
import { HttpClient } from '@angular/common/http';
import { ActiveService } from './active.service';
import { Active } from '../../Interfaces/active';
import { HomeComponent } from '../../Components/home/home.component';
import { UsersService } from './users.service';
import { ActiveVivoService } from './active-vivo.service';
import { UsersServiceVivo } from './users.service.vivo';

@Injectable({
  providedIn: 'root'
})
export class AllUsers {

  public userService = inject(UsersService)
  public userServiceVivo = inject(UsersServiceVivo)
  
  public userServiceActive = inject(ActiveService)
  public userServiceActiveVivo = inject(ActiveVivoService)

  constructor() { 
    
  }

  public async cruzaInfosIp(): Promise<any[]> {
    try {
      let ativosVelonic: Active[] = [];
      let ativosVivo: any[] = [];
      let usuariosVelonic: any[] = [];
      let usuariosVivo: any[] = [];
  
      // Captura os dados de cada serviço com tratamento de erros
      try {
        ativosVelonic = await this.userServiceActive.getUsuariosAtivos() || [];
      } catch (err) {
        console.error("Erro ao buscar usuários ativos Velonic:", err);
      }
  
      try {
        ativosVivo = await this.userServiceActiveVivo.getUsuariosAtivosVivo() || [];
      } catch (err) {
        console.error("Erro ao buscar usuários ativos Vivo:", err);
      }
  
      try {
        usuariosVelonic = await this.userService.getUsuarios() || [];
      } catch (err) {
        console.error("Erro ao buscar usuários Velonic:", err);
      }
  
      try {
        usuariosVivo = await this.userServiceVivo.getUsuarios() || [];
      } catch (err) {
        console.error("Erro ao buscar usuários Vivo:", err);
      }
  
      // Atualiza a lista de usuários Velonic com informações dos ativos
      const updatedList = usuariosVelonic.map((user: any) => {
        const isActiveVelonic = ativosVelonic.some((activeUser: any) => activeUser?.name === user?.name);
        const isActiveVivo = ativosVivo.some((activeUser: any) => activeUser?.name === user?.name);
  
        const vivoUser = usuariosVivo.find((vivoUser: any) => vivoUser?.name === user?.name);
        let vivoLastLog = vivoUser?.lastLog || 'N/A';
        if (vivoLastLog === 'jan/01/1970 00:00:00') {
          vivoLastLog = 'N/A';
        }
  
        let velonicLastLog = user?.lastLog || 'N/A';
        if (velonicLastLog === 'jan/01/1970 00:00:00') {
          velonicLastLog = 'N/A';
        }
        
        
        // Adiciona os atributos dos usuários ativos Velonic ao usuário correspondente
        let upTime = 'N/A'; // Default caso não esteja ativo
        if (isActiveVelonic) {
          const activeVelonicInfo = ativosVelonic.find((activeUser: any) => activeUser?.name === user?.name);
          if (activeVelonicInfo) {
            user = { ...user, ...activeVelonicInfo };
            upTime = activeVelonicInfo.upTime || 'N/A'; // Insere o atributo upTime
          }
        }
  
        return {
          ...user,
          online_Vivo: isActiveVivo ? 'yes' : 'no',
          online_Velonic: isActiveVelonic ? 'yes' : 'no',
          lastLogVivo: vivoLastLog,
          lastLogVelonic: velonicLastLog,
          upTime, // Inclui o atributo upTime no retorno
        };
      });
  
      console.log(updatedList);
      return updatedList;
    } catch (err) {
      console.error("Erro geral no cruzamento de informações:", err);
      return []; // Retorne um array vazio em caso de erro geral
    }
  }
  

}
