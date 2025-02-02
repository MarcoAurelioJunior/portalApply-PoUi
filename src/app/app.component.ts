import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoTableModule,
  PoToolbarModule,
} from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(
    private router: Router
  ){}
  menus: Array<PoMenuItem> = [
    {
      label: 'Usuários',
      icon: 'po-icon-user',
      shortLabel: 'Usuários',
      action: this.usuarios.bind(this)
    },
    {
      label: 'Gerenciador',
      icon: 'ph ph-vinyl-record',
      shortLabel: 'Gerenciamento',
      action: this.gerenciamento.bind(this)
    },
    {
      label: 'DashBoard',
      icon: 'ph ph-chart-bar',
      shortLabel: 'Dash',
      action: this.dash.bind(this)
    },
  ]

  private usuarios() {
    this.router.navigate(['/','home'])
  }
  private gerenciamento() {
    this.router.navigate(['/','gerenciamento'])
  }
  private dash() {
    this.router.navigate(['/','dashboard'])
  }

}
