import { Component, inject } from '@angular/core';
import { PoChartModule, PoChartOptions, PoChartSerie, PoChartType, PoDialogService, PoInfoComponent, PoInfoModule, PoPageModule, PoTableColumn, PoTableModule } from '@po-ui/ng-components';
import { ActiveVivoService } from '../../Services/users/active-vivo.service';
import { ActiveService } from '../../Services/users/active.service';
import { AllUsers } from '../../Services/users/AllUsers.service';
import { PoWidgetModule } from '@po-ui/ng-components';
import { DashBoard } from '../../Services/DashBoard/DashService';
import { never } from 'rxjs';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PoChartModule, PoWidgetModule, PoPageModule, PoInfoModule, PoTableModule, PoTableModule, PoPageDynamicSearchModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public highestUpTime = 0

  public allUser = inject(AllUsers);
  public ret2: any;
  public values: Array<PoChartSerie> = [];
  public values2: Array<PoChartSerie> = [];
  public values3: Array<PoChartSerie> = []

  public nameOfLineChat = ''
  
  DashService = inject(DashBoard);
  public uptime$ = this.DashService.getUpTime();
  public name$ = this.DashService.getUpTime();

  public retItem: Array<any> = []
  public retItemOff: Array<any> = []

  public name: Array<string> = [];

  public chartType = PoChartType.Column;
  public chartType1 = PoChartType.Line;

  async ngOnInit(): Promise<void> {
    this.columns = this.getColumns()
    this.retItemOff = await this.allUser.cruzaInfosIp()

    this.uptime$.subscribe({
      next: (value: any[]): void => {
        value.forEach(element => {
          this.converterParaHoras(element.uptime, element.name, element.lastLog, element.service)
          this.retItem.push(element)
        });
      },
      error: (err): void => {
        console.log(err);
      }
    });

    this.name$.subscribe({
      next: (value: any[]): void => {
        this.name = value.map(element => element.name || ''); // Exemplo de extração
        this.values = this.name.map(name => ({
          label: name,
          data: [Math.random() * 100] // Exemplo de dado fictício
        }));
      },
      error: (err:any): void => {
        console.log(err);
      }
    });

    this.name$.subscribe({
      next: (value: any[]): void => {
        this.name = value.map(element => element.name || ''); // Exemplo de extração
        this.values2 = this.name.map(name => ({
          label: name,
          data: [
            50,20,30,50,70,100
          ],
        }));
      },
      error: (err:any): void => {
        console.log(err);
      }
    });
  }
  
  valor: any[] = []; // Inicializa como um array vazio

  public DataClicked(value: any): void {
    const dataValue = value?.data;

    // Verifica se `dataValue` é válido
    if (dataValue !== undefined && dataValue !== null) {
      const index = this.valor.indexOf(dataValue);

      if (index === -1) {
        // Adiciona o valor caso ele ainda não exista
        this.valor.push(dataValue);
      } else {
        // Remove o valor se ele já existir
        this.valor.splice(index, 1);
      }
    }

    this.nameOfLineChat = value.label

    // Atualiza `values3` com os dados acumulados em `valor`
    this.values3 = [
      {
        label: value?.label || 'Default Label', // Valor padrão para o rótulo
        data: [...this.valor] // Espalha os valores acumulados
      }
    ];

  }

  public highValue = 0
  public highValueTxt = ''
  public highName = ''
  public lastLog = ''
  public service = ''
  public converterParaHoras(tempo: string, name: string, lastLog: string, service: string): void {
    let horas = 0, minutos = 0, segundos = 0;
  
    // Usar regex para extrair horas, minutos e segundos
    const regexHoras = /(\d+)h/;
    const regexMinutos = /(\d+)m/;
    const regexSegundos = /(\d+)s/;
  
    // Extrair e converter os valores, se existirem
    const matchHoras = tempo.match(regexHoras);
    const matchMinutos = tempo.match(regexMinutos);
    const matchSegundos = tempo.match(regexSegundos);
  
    if (matchHoras) horas = parseInt(matchHoras[1], 10);
    if (matchMinutos) minutos = parseInt(matchMinutos[1], 10);
    if (matchSegundos) segundos = parseInt(matchSegundos[1], 10);
    
    if(this.highValue < horas + minutos / 60 + segundos / 3600){
      console.log(horas + minutos / 60 + segundos / 3600)
      this.highValue = horas + minutos / 60 + segundos / 3600
      this.highValueTxt = tempo
      this.highName = name
      this.lastLog = lastLog
      this.service = service
    }else{
      this.highValue = this.highValue
      
    }
    
    // Converter para horas decimais
    console.log(horas + minutos / 60 + segundos / 3600)
    this.highestUpTime = horas + minutos / 60 + segundos / 3600; 
  }

  
  async usuarioSelecionado(usuario: any){

    this.highName = usuario.name
    this.service = usuario.profile
    this.lastLog = usuario.lastLog
    this.highValueTxt = usuario.upTime

  }

  public columns: any
  getColumns(): Array<PoTableColumn> {
      return [
        {
          property: 'disabled', 
          type: 'label',
          width:'5%',
          labels: [
            {value: 'true', icon: 'ph ph-prohibit', label: 'Bloqueado', color: 'darkred'},
            {value: 'false', icon: 'ph ph-check', label: 'Autorizado', color: 'blue'},
          ]
        },
        {property: 'name', label: 'Nome'},

        {
          property: 'online_Velonic',
          label:'Online Velonic',
          type: 'label',
          labels: [
            {value: 'yes', label: 'Online', color: 'green', icon: 'ph ph-cell-signal-full'},
            {value: 'no', label: 'Offline', color: 'red', icon: 'ph ph-cell-signal-x'},
          ]
        },
        {
          property: 'online_Vivo',
          label:'Online Vivo',
          type: 'label',
          labels: [
            {value: 'yes', label: 'Online', color: 'green', icon: 'ph ph-cell-signal-full'},
            {value: 'no', label: 'Offline', color: 'red', icon: 'ph ph-cell-signal-x'},
          ]
        },
        {property: 'lastLogVelonic', label: 'Último acesso Velonic'},
        {property: 'lastLogVivo', label: 'Último acesso Vivo'},
      ]
    }
}
