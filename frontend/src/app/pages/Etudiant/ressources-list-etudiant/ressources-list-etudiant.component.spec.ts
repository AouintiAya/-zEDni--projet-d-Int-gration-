import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourcesListEtudiantComponent } from './ressources-list-etudiant.component';

describe('RessourcesListEtudiantComponent', () => {
  let component: RessourcesListEtudiantComponent;
  let fixture: ComponentFixture<RessourcesListEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RessourcesListEtudiantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RessourcesListEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
