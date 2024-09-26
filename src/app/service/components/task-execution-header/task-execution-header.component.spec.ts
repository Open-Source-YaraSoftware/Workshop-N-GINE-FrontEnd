import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskExecutionHeaderComponent } from './task-execution-header.component';

describe('TaskExecutionHeaderComponent', () => {
  let component: TaskExecutionHeaderComponent;
  let fixture: ComponentFixture<TaskExecutionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskExecutionHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskExecutionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
