import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInterventionDialogComponent } from './new-intervention-dialog.component';

describe('NewInterventionDialogComponent', () => {
  let component: NewInterventionDialogComponent;
  let fixture: ComponentFixture<NewInterventionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewInterventionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewInterventionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
