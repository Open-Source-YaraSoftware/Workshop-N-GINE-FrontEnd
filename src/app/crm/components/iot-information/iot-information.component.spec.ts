import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotInformationComponent } from './iot-information.component';

describe('IotInformationComponent', () => {
  let component: IotInformationComponent;
  let fixture: ComponentFixture<IotInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IotInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IotInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
