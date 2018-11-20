import { TestBed } from '@angular/core/testing';

import { GeolocationService } from './geolocation.service';
import { WindowWrapper } from './WindowWrapper';

describe('GeolocationService', () => {
  let service: GeolocationService;
  let getCurrentPositionFake: jasmine.Spy;

  beforeEach(() => {
    getCurrentPositionFake = jasmine.createSpy();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: WindowWrapper, useValue: {
            navigator: {
              geolocation: {
                getCurrentPosition: getCurrentPositionFake
              }
            }
          }
        }
      ]
    });

    service = TestBed.get(GeolocationService);
  });

  describe('when geolocation is not available', () => {
    it('should reject the promise', (done) => {
      getCurrentPositionFake.and.throwError('whatever');
      service.getCurrentPosition().catch((error) => {
        expect(error).toEqual('Geolocation not available');
        done();
      });
    });
  });

  describe('when geolocation is available', () => {
    describe(`but user doesn't allow it`, () => {
      it('should reject the promise', (done) => {
        getCurrentPositionFake.and.callFake((onSuccess, onError) => onError('not allowed'));

        service.getCurrentPosition().catch((error) => {
          expect(error).toEqual('not allowed');
          done();
        });
      });
    });

    it('should resolve to users position', (done) => {
      const getPosition = (): Position => ({
        coords: {
          accuracy: 1,
          altitude: 1,
          altitudeAccuracy: 1,
          heading: 1,
          speed: 1,
          latitude: 1,
          longitude: 2
        }, timestamp: 1
      });
      getCurrentPositionFake.and.callFake((onSuccess) => onSuccess(getPosition()));

      service.getCurrentPosition().then((position) => {
        expect(position).toEqual(getPosition());
        done();
      });
    });
  });
});
