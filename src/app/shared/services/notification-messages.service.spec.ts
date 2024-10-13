import { TestBed } from '@angular/core/testing';

import { NotificationMessagesService } from './notification-messages.service';

describe('NotificationMessagesService', () => {
  let service: NotificationMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
