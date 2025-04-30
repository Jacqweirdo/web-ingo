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
  textoBusqueda: string = ''; // input enlazado
  usuariosFiltrados: any[] = []; // lista filtrada

  constructor(private datosusuariosService: DatosusuariosService) {}

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos(): void {
    this.datosusuariosService.getDatosUsuarios().subscribe(data => {
      this.usuarios = data;
      this.usuariosFiltrados = [...this.usuarios]; // inicia sin filtro
      this.totalPaginas = Math.ceil(this.usuariosFiltrados.length / this.registrosPorPagina);
      this.paginarUsuarios();
    });
  }



  paginarUsuarios(): void {
    const inicio = (this.currentPage - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.usuariosPaginados = this.usuariosFiltrados.slice(inicio, fin);
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

  filtrarUsuarios(): void {
    const texto = this.textoBusqueda.toLowerCase();

    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.nombre?.toLowerCase().includes(texto) ||
      usuario.telefono?.toLowerCase().includes(texto) ||
      usuario.correo?.toLowerCase().includes(texto)
    );

    this.totalPaginas = Math.ceil(this.usuariosFiltrados.length / this.registrosPorPagina);
    this.currentPage = 1;
    this.paginarUsuarios();
  }


  cerrarModal() {
    this.modalAbierto = false;
  }
}
