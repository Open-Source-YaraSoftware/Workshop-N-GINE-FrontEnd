import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityExecutionComponent } from './activity-execution.component';

describe('ActivityExecutionHeaderComponent', () => {
  let component: ActivityExecutionComponent;
  let fixture: ComponentFixture<ActivityExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityExecutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
