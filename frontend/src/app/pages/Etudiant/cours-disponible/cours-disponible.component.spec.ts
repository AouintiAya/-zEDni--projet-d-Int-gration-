import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursDisponibleComponent } from './cours-disponible.component';

describe('CoursDisponibleComponent', () => {
  let component: CoursDisponibleComponent;
  let fixture: ComponentFixture<CoursDisponibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursDisponibleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
