import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMonitoringComponent } from './task-monitoring.component';

describe('TaskMonitoringComponent', () => {
  let component: TaskMonitoringComponent;
  let fixture: ComponentFixture<TaskMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskMonitoringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
