import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PoDynamicFormField, PoDynamicModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [PoDynamicModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent{
  @Input('dBool') disabledBool: boolean = false
  @Input('value') valor: any = {}
  
  public newName: string = ''
  public newPass: string = ''

  public fields: Array<PoDynamicFormField> = []

  public fields2(): Array<PoDynamicFormField> {
    return [
      {property: 'name', label: 'Nome', disabled: this.disabledBool},
      {property: 'password', label: 'Password', disabled: this.disabledBool},
      {
        property: 'Profile', 
        label: 'Profile', 
        disabled: true,
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
    this.retCred(changeValue)
  }

  public retCred(changeValue:any): Array<string> {
    return [
      this.newName = changeValue.value.name,
      this.newPass = changeValue.value.password
    ]
  }

}
