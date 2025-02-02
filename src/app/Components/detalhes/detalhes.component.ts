import { Component } from '@angular/core';
import { PoDynamicFormField, PoDynamicModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [PoDynamicModule],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent {
  public fields: Array<PoDynamicFormField> = [
    {property: 'name', label: 'Nome', disabled: true},
    {property: 'password', label: 'Senha', disabled: true},
    {property: 'profile', label: 'Profile', disabled: true},
  ]

  

  public user = {}

  private password = sessionStorage.getItem('pass')
  private name = sessionStorage.getItem('name')
  private profile = sessionStorage.getItem('profile')

  ngOnInit(){
    this.user = {
      name: this.name,
      password: this.password,
      profile: this.profile
    }
    console.log(this.password)
  }

}
