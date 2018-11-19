import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { usedMaterialModules } from '../usedMaterialModules';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { RootState } from '../reducers';
import { SetAuthor, SetLicenses, SetMaxDate, SetMinDate, SetText } from '../actions/filter.actions';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Author, emptyAuthor } from '../models/author.model';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let store: Store<RootState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [
        ...usedMaterialModules,
        FormsModule,
        NoopAnimationsModule,
        StoreModule.forRoot({...fromRoot.reducers})
      ]
    });
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  describe('text search', () => {
    const getSearchInput = (): HTMLInputElement => fixture.nativeElement.querySelector('#searchTextInput');

    it('should apply value from store to text field', async(() => {
      store.dispatch(new SetText('cat'));
      fixture.detectChanges();

      fixture.whenStable().then(() => expect(getSearchInput().value).toEqual('cat'));
    }));

    it('should dispatch SetText on text change', () => {
      const newValue = 'new value';
      const searchInput = getSearchInput();

      searchInput.value = newValue;
      searchInput.dispatchEvent(new Event('input'));

      expect(store.dispatch).toHaveBeenCalledWith(new SetText(newValue));
    });
  });

  describe('licenses select', () => {
    it('should apply value from store to select', () => {
      const getLicenses = () => ['license 1', 'license 2'];
      store.dispatch(new SetLicenses(getLicenses()));
      fixture.detectChanges();

      expect(component.filter.licenses).toContain(getLicenses()[0]);
      expect(component.filter.licenses).toContain(getLicenses()[1]);
    });

    it('should dispatch SetLicenses on text change', () => {
      const getLicenses = () => ['license 1', 'license 2'];

      component.onLicensesChange({value: getLicenses()} as any);

      expect(store.dispatch).toHaveBeenCalledWith(new SetLicenses(getLicenses()));
    });
  });

  describe('min date input', () => {
    const getMinDateInput = (): HTMLInputElement => fixture.nativeElement.querySelector('#minDateInput');

    it('should apply value from store to input', async(() => {
      const getDate = () => new Date('2018-11-01 12:50:43');
      store.dispatch(new SetMinDate(getDate()));
      fixture.detectChanges();

      fixture.whenStable().then(() => expect(getMinDateInput().value).toEqual('11/1/2018'));
    }));

    it('should dispatch SetLicenses on text change', () => {
      const getDate = () => new Date('2018-11-01 12:50:43');

      component.onMinDateChange({value: getDate()} as any);

      expect(store.dispatch).toHaveBeenCalledWith(new SetMinDate(getDate()));
    });
  });

  describe('max date input', () => {
    const getMaxDateInput = (): HTMLInputElement => fixture.nativeElement.querySelector('#maxDateInput');

    it('should apply value from store to input', async(() => {
      const getDate = () => new Date('2018-11-01 12:50:43');
      store.dispatch(new SetMaxDate(getDate()));
      fixture.detectChanges();

      fixture.whenStable().then(() => expect(getMaxDateInput().value).toEqual('11/1/2018'));
    }));

    it('should dispatch SetLicenses on text change', () => {
      const getDate = () => new Date('2018-11-01 12:50:43');

      component.onMaxDateChange({value: getDate()} as any);

      expect(store.dispatch).toHaveBeenCalledWith(new SetMaxDate(getDate()));
    });
  });

  describe('author chip', () => {
    const getAuthorChip = (): HTMLElement => fixture.nativeElement.querySelector('mat-chip');
    const getAuthorChipRemoveButton = (): any => fixture.nativeElement.querySelector('mat-chip mat-icon');

    it('should apply value from store to input', async(() => {
      const getAuthor = (): Author => ({id: '1', name: 'name surname'});
      store.dispatch(new SetAuthor(getAuthor()));
      fixture.detectChanges();

      fixture.whenStable().then(() => expect(getAuthorChip().textContent).toContain('Author: name surname'));
    }));

    it('should dispatch empty SetAuthor when removing chip', () => {
      const getAuthor = (): Author => ({id: '1', name: 'name surname'});
      store.dispatch(new SetAuthor(getAuthor()));
      fixture.detectChanges();

      getAuthorChipRemoveButton().dispatchEvent(new Event('click'));
      expect(store.dispatch).toHaveBeenCalledWith(new SetAuthor(emptyAuthor()));
    });
  });
});
