import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoursComponent } from './admin-cours.component';

describe('AdminCoursComponent', () => {
  let component: AdminCoursComponent;
  let fixture: ComponentFixture<AdminCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
