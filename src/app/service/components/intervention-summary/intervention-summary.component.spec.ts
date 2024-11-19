import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionSummaryComponent } from './intervention-summary.component';

describe('InterventionSummaryComponent', () => {
  let component: InterventionSummaryComponent;
  let fixture: ComponentFixture<InterventionSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterventionSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
