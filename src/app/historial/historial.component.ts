import { Component, OnInit } from '@angular/core';
import { DatosusuariosService } from '../services/datosusuarios.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  usuarios: any[] = [];
  usuariosPaginados: any[] = [];
  currentPage: number = 1;
  registrosPorPagina: number = 10;
  totalPaginas: number = 0;

  // Modal variables
  modalAbierto: boolean = false;
  imagenModal: string = '';
  descripcionModal: string = '';
  tituloModal: string = '';

  constructor(private datosusuariosService: DatosusuariosService) {}

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos(): void {
    this.datosusuariosService.getDatosUsuarios().subscribe(data => {
      this.usuarios = data;
      this.totalPaginas = Math.ceil(this.usuarios.length / this.registrosPorPagina);
      this.paginarUsuarios();
    });
  }


  paginarUsuarios() {
    const inicio = (this.currentPage - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.usuariosPaginados = this.usuarios.slice(inicio, fin);
  }

  siguientePagina() {
    if (this.currentPage < this.totalPaginas) {
      this.currentPage++;
      this.paginarUsuarios();
    }
  }

  paginaAnterior() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginarUsuarios();
    }
  }

  abrirModal(imagen: string, descripcion: string, titulo: string) {
    if (imagen && descripcion && titulo) { // <-- validamos que no venga vacío
      this.imagenModal = imagen;
      this.descripcionModal = descripcion;
      this.tituloModal = titulo;
      this.modalAbierto = true; // <-- esto abre el modal
    } else {
      console.error('Error: faltan datos del mapa');
    }
  }


  cerrarModal() {
    this.modalAbierto = false;
  }
}
