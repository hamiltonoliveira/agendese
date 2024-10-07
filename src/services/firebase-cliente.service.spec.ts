import { TestBed } from '@angular/core/testing';

import { FirebaseClienteService } from './firebase-cliente.service';

describe('FirebaseClienteService', () => {
  let service: FirebaseClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
