import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDashboardComponent } from './dashboard-enseignant.component';

describe('DashboardEnseignantComponent', () => {
  let component:TeacherDashboardComponent ;
  let fixture: ComponentFixture<TeacherDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TeacherDashboardComponent],
      declarations: [TeacherDashboardComponent]
    });
    fixture = TestBed.createComponent(TeacherDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
