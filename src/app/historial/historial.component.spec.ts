import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialComponent } from './historial.component';

describe('HistorialComponent', () => {
  let component: HistorialComponent;
  let fixture: ComponentFixture<HistorialComponent>;
  let modal: any;
let modalImagen: any;
let modalTitulo: any;
let modalDescripcion: any;
let cerrarModalBtn: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  
});
