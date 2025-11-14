import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCoursEtudiantComponent } from './page-cours-etudiant.component';

describe('PageCoursEtudiantComponent', () => {
  let component: PageCoursEtudiantComponent;
  let fixture: ComponentFixture<PageCoursEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCoursEtudiantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCoursEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
