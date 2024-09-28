import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMechanicDialogComponent } from './new-mechanic-dialog.component';

describe('NewMechanicDialogComponent', () => {
  let component: NewMechanicDialogComponent;
  let fixture: ComponentFixture<NewMechanicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMechanicDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMechanicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
