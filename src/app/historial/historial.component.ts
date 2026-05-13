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

  modalAbierto: boolean = false;
  imagenModal: string = '';
  descripcionModal: string = '';
  tituloModal: string = '';

  textoBusqueda: string = '';
  usuariosFiltrados: any[] = [];

  constructor(private datosusuariosService: DatosusuariosService) {}

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos(): void {
    this.datosusuariosService.getDatosUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data
          .map(usuario => ({
            ...usuario,
            mapatextura: this.normalizarUrl(usuario.mapatextura),
            mapaagua: this.normalizarUrl(usuario.mapaagua),
            mapafotosintesis: this.normalizarUrl(usuario.mapafotosintesis),
            planorelieve: this.normalizarUrl(usuario.planorelieve)
          }))
          .sort((a, b) => {
            const fechaA = new Date(a.created_at).getTime();
            const fechaB = new Date(b.created_at).getTime();
            return fechaB - fechaA;
          });

        this.usuariosFiltrados = [...this.usuarios];
        this.totalPaginas = Math.ceil(this.usuariosFiltrados.length / this.registrosPorPagina);
        this.paginarUsuarios();
      },
      error: (err) => {
        console.error('Error al obtener datos de usuarios:', err);
      }
    });
  }

  normalizarUrl(url: any): string {
    if (!url) {
      return '';
    }

    return url.toString().trim();
  }

  paginarUsuarios(): void {
    const inicio = (this.currentPage - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.usuariosPaginados = this.usuariosFiltrados.slice(inicio, fin);
  }

  siguientePagina(): void {
    if (this.currentPage < this.totalPaginas) {
      this.currentPage++;
      this.paginarUsuarios();
    }
  }

  paginaAnterior(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginarUsuarios();
    }
  }

  abrirModal(imagen: string, descripcion: string | null | undefined, titulo: string): void {
    if (!imagen) {
      console.error('No hay imagen disponible para abrir');
      return;
    }

    this.imagenModal = imagen;
    this.descripcionModal = descripcion || 'Sin descripción disponible.';
    this.tituloModal = titulo;
    this.modalAbierto = true;
  }

  filtrarUsuarios(): void {
    const texto = this.textoBusqueda.toLowerCase().trim();

    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.nombre?.toLowerCase().includes(texto) ||
      usuario.telefono?.toLowerCase().includes(texto) ||
      usuario.correo?.toLowerCase().includes(texto)
    );

    this.totalPaginas = Math.ceil(this.usuariosFiltrados.length / this.registrosPorPagina);
    this.currentPage = 1;
    this.paginarUsuarios();
  }

  cerrarModal(): void {
    this.modalAbierto = false;
  }

  abrirImagenNuevaPestana(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  manejarErrorImagen(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';

    const contenedor = img.parentElement;
    if (contenedor) {
      contenedor.classList.add('imagen-error');
    }
  }
}