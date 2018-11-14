import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LicenseEffects } from './license.effects';

describe('LicenseEffects', () => {
  let actions$: Observable<any>;
  let effects: LicenseEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LicenseEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(LicenseEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
