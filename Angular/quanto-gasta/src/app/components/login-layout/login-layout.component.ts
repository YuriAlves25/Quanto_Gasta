import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login-layout',
  standalone: true,
  imports: [],
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.scss'
})
export class LoginLayoutComponent {
  @Input() tittle : string = "";
  @Input() primaryBtnText : string = "";
  @Input() secondaryBtnText : string = "";

}
