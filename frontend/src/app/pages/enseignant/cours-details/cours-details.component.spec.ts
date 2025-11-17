import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursDetailsComponent } from './cours-details.component';

describe('CoursDetailsComponent', () => {
  let component: CoursDetailsComponent;
  let fixture: ComponentFixture<CoursDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
