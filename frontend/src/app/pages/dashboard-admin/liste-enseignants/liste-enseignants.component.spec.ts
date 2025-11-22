import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEnseignantsComponent } from './liste-enseignants.component';

describe('ListeEnseignantsComponent', () => {
  let component: ListeEnseignantsComponent;
  let fixture: ComponentFixture<ListeEnseignantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeEnseignantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeEnseignantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
