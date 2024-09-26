import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRequestsComponent } from './task-requests.component';

describe('TaskRequestsComponent', () => {
  let component: TaskRequestsComponent;
  let fixture: ComponentFixture<TaskRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
