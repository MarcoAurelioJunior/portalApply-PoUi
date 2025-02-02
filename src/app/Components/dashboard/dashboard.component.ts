import { Component, inject } from '@angular/core';
import { PoChartModule, PoChartOptions, PoChartSerie, PoChartType, PoDialogService } from '@po-ui/ng-components';
import { ActiveVivoService } from '../../Services/users/active-vivo.service';
import { ActiveService } from '../../Services/users/active.service';
import { AllUsers } from '../../Services/users/AllUsers.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PoChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
  public allUser = inject(AllUsers);
  public ret = this.allUser.cruzaInfosIp(); // A Promise que irá retornar os dados
  public ret2: any; 
  values: Array<PoChartSerie> = [];
  
  async ngOnInit(): Promise<void> {
    try {
      // Aguarda a resolução da Promise
      const resolvedData = await this.ret;
      
      // Itera sobre os elementos retornados
      resolvedData.forEach(element => {
        if (element.online_Velonic === 'yes') {
          // Adiciona os dados de cada usuário à lista `values`
          this.values =[
            {label: element.name, data: 5}
          ];
        }
      });
      
      console.log(this.values); // Verifica o conteúdo de `values`
      
    } catch (error) {
      console.error("Erro ao processar os dados:", error);
    }
  }

  
}
