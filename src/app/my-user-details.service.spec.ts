import { TestBed } from '@angular/core/testing';

import { MyUserDetailsService } from './my-user-details.service';

describe('MyUserDetailsService', () => {
  let service: MyUserDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyUserDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
