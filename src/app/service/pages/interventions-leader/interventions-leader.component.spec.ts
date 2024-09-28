import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionsLeaderComponent } from './interventions-leader.component';

describe('InterventionsLeaderComponent', () => {
  let component: InterventionsLeaderComponent;
  let fixture: ComponentFixture<InterventionsLeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterventionsLeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionsLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
