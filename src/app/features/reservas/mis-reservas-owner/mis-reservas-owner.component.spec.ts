import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisReservasOwnerComponent } from './mis-reservas-owner.component';

describe('MisReservasOwnerComponent', () => {
  let component: MisReservasOwnerComponent;
  let fixture: ComponentFixture<MisReservasOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisReservasOwnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisReservasOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
