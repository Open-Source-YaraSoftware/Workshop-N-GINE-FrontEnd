import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionsAssistantComponent } from './interventions-assistant.component';

describe('TasksComponent', () => {
  let component: InterventionsAssistantComponent;
  let fixture: ComponentFixture<InterventionsAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterventionsAssistantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionsAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
