import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionDiagnosticComponent } from './intervention-diagnostic.component';

describe('InterventionDiagnosticComponent', () => {
  let component: InterventionDiagnosticComponent;
  let fixture: ComponentFixture<InterventionDiagnosticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterventionDiagnosticComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
