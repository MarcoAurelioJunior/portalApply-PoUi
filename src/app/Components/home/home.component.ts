import { Component, inject, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PoComboComponent, PoDynamicFormField, PoDynamicFormValidation, PoModalAction, PoModalComponent, PoMultiselectOption, PoTableAction, PoTableColumn, PoTableComponent, PoTableModule } from '@po-ui/ng-components';
import { environment } from '../../../environments/environment.development';
import { Usuarios } from '../../Interfaces/usuarios';
import { UsersService } from '../../Services/users/users.service';
import { PoButtonModule } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { ActiveService } from '../../Services/users/active.service';
import { Active } from '../../Interfaces/active';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoInfoModule } from '@po-ui/ng-components';
import { PoDynamicModule } from '@po-ui/ng-components';
import { PoDynamicField } from '@po-ui/ng-components/lib/components/po-dynamic/po-dynamic-field.interface';
import { FormComponent } from "../form/form.component";
import { PoModalModule } from '@po-ui/ng-components';
import { UsersServiceVivo } from '../../Services/users/users.service.vivo';
import { ActiveVivoService } from '../../Services/users/active-vivo.service';
import { BlockUserService } from '../../Services/Manipulates/block-user.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { UpdatePassword } from '../../Services/Manipulates/updatePass.service';
import { AllUsers } from '../../Services/users/AllUsers.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PoTableModule, PoButtonModule, PoFieldModule, PoInfoModule, PoDynamicModule, FormComponent, PoModalModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  //Modals
  @ViewChild('modal') modalComp!: PoModalComponent;
  @ViewChild('modalDetail') modalDetail!: PoModalComponent;
  @ViewChild('modalEdit') modalEdit!: PoModalComponent;
  //----------------------------------------------------------


  //Inject do serviço de Usuários
  
  public allUsers = inject(AllUsers)

  //Inject de manipulação dos usuários
  public blockUser = inject(BlockUserService)
  public passUser = inject(UpdatePassword)

  //----------------------------------------------------------

  public userName: string = ''
  public newPassword: string = ''

  public usuarios: Array<Usuarios> = []
  public usuario = {} as Usuarios
  public usuariosAtivos: Array<any> = []

  public tabelas: any
  public columns: Array<PoTableColumn> = []

  person = {}

  //MultiSelect para online
  async changed(value:any){
    if(value == 1){
      this.usuarios = await this.allUsers.cruzaInfosIp()
    }
    if(value == 2){
      this.usuarios = (await this.allUsers.cruzaInfosIp()).filter(e=>e.online_Vivo == 'yes')
    }
    if(value == 3){
      this.usuarios = (await this.allUsers.cruzaInfosIp()).filter(e=>e.online_Velonic == 'yes')
    }
  }
  //----------------------------------------------------------



  public actions: Array<PoTableAction> = [
    {label: 'Detalhes', action: this.Detalhes.bind(this)}, 
    {label: 'Bloquear', action: this.Bloquear.bind(this)}, 
    {label: 'Editar', action: this.Editar.bind(this)}
  ]

  constructor(
    private router:Router,
    private notification: PoNotificationService
  ){}

  async ngOnInit(): Promise<void> {  
    
    this.usuarios = await this.allUsers.cruzaInfosIp()
    this.columns = this.getColumns()

    console.log(environment.usuarios)
  }



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
      {property: 'address', label: 'Endereço'},
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

  Detalhes(ret: any) {
    sessionStorage.setItem('pass', ret.password)
    sessionStorage.setItem('name', ret.name)
    sessionStorage.setItem('profile', ret.profile)

    this.usuario = ret.name
    this.modalDetail.open()

    this.usuario = {
      name: ret.name,
      password: ret.password,
      profile: ret.profile,
      disabled: ret.disabled,
      address: ret.address,
      lastLog: ret.lastLog
    }
    // this.router.navigate(['/', 'detalhes'])
  }

  Editar(ret:any){
    this.usuario = {
      name: ret.name,
      password: ret.password,
      profile: ret.profile,
      disabled: ret.disabled,
      address: ret.address,
      lastLog: ret.lastLog
    }

    this.modalEdit.open()
  }

  Incluir(){
    this.router.navigate(['/','adicionar'])
  }

  Bloquear(user:any){
    this.modalComp.open()

    this.usuario.name = user.name
    this.usuario.disabled = user.disabled

  }

  async confirmExc() {
    try {
      console.log("Valor de this.usuario.disabled:", this.usuario.disabled);
      console.log("Tipo de this.usuario.disabled:", typeof this.usuario.disabled);
  
      // Converte o valor para string, removendo espaços em branco
      const isDisabledString = String(this.usuario.disabled).trim().toLowerCase();
  
      // Verifica se o valor é "true" (caso-insensível) ou equivalente
      const isDisabled = isDisabledString === "true";
  
      // Define o status com base no valor tratado
      const block = isDisabled ? 'no' : 'yes';
  
      console.log("Status calculado (block):", block);
  
      // Fecha o modal e chama o método blockUser
      this.modalComp.close();
      await this.blockUser.blockUser(this.usuario.name, block);
      this.usuarios = await this.allUsers.cruzaInfosIp()
      this.notification.success('Usuário bloqueado/desbloqueado com sucesso!')
    } catch (error) {
      console.error("Erro em confirmExc:", error);
      this.notification.error('Erro ao bloquear/desbloquear usuário!')
    }
  }
  
  async confirmEd() {
    try {
      this.modalEdit.close();
      await this.passUser.UpdatePass(this.usuario.name, this.newPassword)
      this.usuarios = await this.allUsers.cruzaInfosIp()

      this.notification.success('Senha editada com sucesso')
    } catch (error) {
      console.error("Erro em confirmExc:", error);
      this.notification.error('Erro ao editar a senha')
    }
  }
  
  confirm: PoModalAction = {
    action: () => {
      this.confirmExc()
    },
    label: 'Bloquear',
    danger: true
  };

  onChangeFields(changeValue:any): void {
    this.newPassword = changeValue.value.password
    this.confirmEd()
  }


  public fields: Array<PoDynamicFormField> = [
    {property: 'name', label: 'Nome', disabled: true},
    {property: 'password', label: 'Senha', disabled: true},
    {property: 'profile', label: 'Profile', disabled: true},
  ]

  public fieldsEdit: Array<PoDynamicFormField> = [
    {property: 'name', label: 'Nome', disabled: true},
    {property: 'password', label: 'Senha', disabled: false},
    {property: 'profile', label: 'Profile', disabled: true},
  ]
}
