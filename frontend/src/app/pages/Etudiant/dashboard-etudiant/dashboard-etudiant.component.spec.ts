import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardEtudiantComponent } from './dashboard-etudiant.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('DashboardEtudiantComponent', () => {
  let component: DashboardEtudiantComponent;
  let fixture: ComponentFixture<DashboardEtudiantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardEtudiantComponent],
      imports: [HttpClientTestingModule] 
    });
    fixture = TestBed.createComponent(DashboardEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
