import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDiagnosticPreparationComponent } from './activity-diagnostic-preparation.component';

describe('ActivityDiagnosticPreparationComponent', () => {
  let component: ActivityDiagnosticPreparationComponent;
  let fixture: ComponentFixture<ActivityDiagnosticPreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityDiagnosticPreparationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityDiagnosticPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
