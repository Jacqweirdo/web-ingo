import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  correo: string = '';
  codigo: string = '';
  mostrarCodigo: boolean = false;

  mensaje: string = '';
  tipoMensaje: 'success' | 'error' | '' = '';

  constructor(
  private http: HttpClient,
  private router: Router
) {}

  enviarCodigo() {

    this.mensaje = '';
    this.tipoMensaje = '';

    if (!this.correo.trim()) {

      this.mensaje = 'Ingresa un correo electrónico.';
      this.tipoMensaje = 'error';

      return;
    }

    this.http.post<any>(
      'http://localhost:3000/api/verificar-correo',
      {
        correo: this.correo
      }
    ).subscribe({

      next: (resp) => {

        console.log(resp);

        this.mostrarCodigo = true;

        this.mensaje = 'Código generado correctamente.';
        this.tipoMensaje = 'success';

      },

      error: (err) => {

        console.error(err);

        this.mensaje = 'Este correo no está autorizado.';
        this.tipoMensaje = 'error';

      }

    });

    

  }

  reenviarCodigo() {
    this.enviarCodigo();
  }

  validarCodigo() {

  this.mensaje = '';
  this.tipoMensaje = '';

  if (!this.codigo.trim()) {
    this.mensaje = 'Ingresa el código de verificación.';
    this.tipoMensaje = 'error';
    return;
  }

  if (this.codigo.trim().length !== 6) {
    this.mensaje = 'El código debe tener 6 dígitos.';
    this.tipoMensaje = 'error';
    return;
  }

  this.http.post<any>(
    'http://localhost:3000/api/validar-codigo',
    {
      correo: this.correo,
      codigo: this.codigo
    }
  ).subscribe({
    next: (resp) => {
      this.mensaje = 'Acceso autorizado. Redirigiendo...';
      this.tipoMensaje = 'success';

      setTimeout(() => {
        this.router.navigate(['/historial']);
      }, 700);
    },

    error: (err) => {
      this.mensaje = err.error?.mensaje || 'Código incorrecto.';
      this.tipoMensaje = 'error';
    }
  });
}

}