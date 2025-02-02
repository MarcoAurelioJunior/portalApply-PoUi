import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-master',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet>
  `
})
export class MasterComponent {

}
