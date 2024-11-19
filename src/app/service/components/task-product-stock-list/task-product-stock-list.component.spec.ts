import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskProductStockListComponent } from './task-product-stock-list.component';

describe('TaskProductStockListComponent', () => {
  let component: TaskProductStockListComponent;
  let fixture: ComponentFixture<TaskProductStockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskProductStockListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskProductStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
