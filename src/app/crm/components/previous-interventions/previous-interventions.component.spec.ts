import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousInterventionsComponent } from './previous-interventions.component';

describe('PreviousInterventionsComponent', () => {
  let component: PreviousInterventionsComponent;
  let fixture: ComponentFixture<PreviousInterventionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviousInterventionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousInterventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
