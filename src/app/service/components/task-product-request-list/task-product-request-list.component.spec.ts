import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskProductRequestListComponent } from './task-product-request-list.component';

describe('TaskProductRequestListComponent', () => {
  let component: TaskProductRequestListComponent;
  let fixture: ComponentFixture<TaskProductRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskProductRequestListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskProductRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
