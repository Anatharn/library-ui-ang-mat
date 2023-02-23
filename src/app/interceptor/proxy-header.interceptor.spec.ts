import { TestBed } from '@angular/core/testing';

import { ProxyHeaderInterceptor } from './proxy-header.interceptor';

describe('ProxyHeaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ProxyHeaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ProxyHeaderInterceptor = TestBed.inject(ProxyHeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
