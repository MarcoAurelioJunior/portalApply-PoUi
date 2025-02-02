import { Component, inject, Input } from '@angular/core';
import { PoDynamicFormField, PoDynamicModule, PoNotificationService } from '@po-ui/ng-components';
import { FormComponent } from '../form/form.component';
import { PoButtonModule } from '@po-ui/ng-components';
import { NewUser } from '../../Services/Manipulates/newUser.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [PoDynamicModule,FormComponent,PoButtonModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {

  ServiceAddUser = inject(NewUser)

  constructor(
    private notif: PoNotificationService
  ){}

  @Input('dBool') disabledBool: boolean = false
  @Input('value') valor: any = {}
    
    public newName: string = ''
    public newPass: string = ''
  
    public fields: Array<PoDynamicFormField> = []
  
    public fields2(): Array<PoDynamicFormField> {
      return [
        {property: 'name', label: 'Nome', disabled: false},
        {property: 'password', label: 'Senha', disabled: false},
        {
          property: 'Profile', 
          label: 'Perfil', 
          disabled: false,
          fieldLabel: 'profile',
          fieldValue: 'opt',
          options: [
            {profile: 'OpenVPN', opt: 'OVPN'},
            {profile: 'Apply', opt: 'Apply'},
            {profile: 'Apply', opt: 'Apply'},
            {profile: 'Apply', opt: 'Apply'},
          ]
        },
      ]
    }
  
    ngOnInit(){
      this.fields = this.fields2()
    }
  
    onChangeFields(changeValue:any): void {
      this.newName = changeValue.value.name,
      this.newPass = changeValue.value.password
    }

    async newUser(){
      try {

        if(this.newName == "" || this.newPass == "" || this.newName == undefined || this.newPass == undefined){
          this.notif.error('Erro ao cadastrar usuário! Alguma credencial se encontra vazia')
        }else{
          await this.ServiceAddUser.novoUsuario(this.newName, this.newPass)
          this.notif.success('Usuário cadastrado com sucesso!')
        }
        
      } catch (error) {
        this.notif.error('Erro ao cadastrar usuário!')
      }
    }

}
