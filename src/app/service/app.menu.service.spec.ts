import { TestBed } from '@angular/core/testing';

import { App.MenuService } from './app.menu.service';

describe('App.MenuService', () => {
  let service: App.MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(App.MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
