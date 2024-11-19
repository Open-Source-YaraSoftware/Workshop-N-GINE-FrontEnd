import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVehicleDialogComponent } from './new-vehicle-dialog.component';

describe('NewVehicleDialogComponent', () => {
  let component: NewVehicleDialogComponent;
  let fixture: ComponentFixture<NewVehicleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewVehicleDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVehicleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
