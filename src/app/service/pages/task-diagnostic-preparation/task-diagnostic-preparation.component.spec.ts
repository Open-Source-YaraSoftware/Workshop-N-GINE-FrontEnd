import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDiagnosticPreparationComponent } from './task-diagnostic-preparation.component';

describe('TaskDiagnosticPreparationComponent', () => {
  let component: TaskDiagnosticPreparationComponent;
  let fixture: ComponentFixture<TaskDiagnosticPreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDiagnosticPreparationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDiagnosticPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
