import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  correo: string = '';
  codigo: string = '';
  mostrarCodigo: boolean = false;

  reenviarCodigo() {
  console.log('Código reenviado');
}

}

