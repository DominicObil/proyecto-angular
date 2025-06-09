import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudRestauranteFormComponent } from './solicitud-restaurante-form.component';

describe('SolicitudRestauranteFormComponent', () => {
  let component: SolicitudRestauranteFormComponent;
  let fixture: ComponentFixture<SolicitudRestauranteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudRestauranteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudRestauranteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
