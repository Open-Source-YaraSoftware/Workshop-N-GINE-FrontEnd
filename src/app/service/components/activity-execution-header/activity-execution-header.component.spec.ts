import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityExecutionHeaderComponent } from './activity-execution-header.component';

describe('ActivityExecutionHeaderComponent', () => {
  let component: ActivityExecutionHeaderComponent;
  let fixture: ComponentFixture<ActivityExecutionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityExecutionHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityExecutionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
