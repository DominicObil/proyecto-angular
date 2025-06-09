import { TestBed } from '@angular/core/testing';

import { SolicitudRestauranteService } from './solicitud-restaurante.service';

describe('SolicitudRestauranteService', () => {
  let service: SolicitudRestauranteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudRestauranteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
