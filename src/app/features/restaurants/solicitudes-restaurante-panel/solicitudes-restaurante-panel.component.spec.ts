import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesRestaurantePanelComponent } from './solicitudes-restaurante-panel.component';

describe('SolicitudesRestaurantePanelComponent', () => {
  let component: SolicitudesRestaurantePanelComponent;
  let fixture: ComponentFixture<SolicitudesRestaurantePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesRestaurantePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesRestaurantePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
