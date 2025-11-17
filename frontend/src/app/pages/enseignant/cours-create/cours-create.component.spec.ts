import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursCreateComponent } from './cours-create.component';

describe('CoursCreateComponent', () => {
  let component: CoursCreateComponent;
  let fixture: ComponentFixture<CoursCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursCreateComponent]  // ✅ composant standalone
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
