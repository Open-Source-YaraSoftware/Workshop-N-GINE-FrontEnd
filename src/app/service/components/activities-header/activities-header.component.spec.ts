import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesHeaderComponent } from './activities-header.component';

describe('ActivitiesHeaderComponent', () => {
  let component: ActivitiesHeaderComponent;
  let fixture: ComponentFixture<ActivitiesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitiesHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitiesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
