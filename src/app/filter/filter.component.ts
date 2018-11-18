import { Component, OnDestroy, OnInit } from '@angular/core';
import { State as Filter } from '../reducers/filter.reducer';
import { select, Store } from '@ngrx/store';
import { RootState } from '../reducers';
import { selectFilter } from '../selectors/filter.selectors';
import { Observable, Subscription } from 'rxjs';
import { SetLicenses, SetMaxDate, SetMinDate, SetText } from '../actions/filter.actions';
import { selectAllLicenses } from '../selectors/licenses.selectors';
import { License } from '../models/license.model';
import { FetchLicenses } from '../actions/license.actions';
import { MatDatepickerInputEvent, MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  public filter: Filter;
  private subscriptions: Subscription = new Subscription();
  private licenses: Observable<License[]>;

  constructor(private store: Store<RootState>) {
  }

  public ngOnInit() {
    this.subscriptions.add(
      this.store.pipe(select(selectFilter))
        .subscribe(filter => this.filter = filter)
    );

    this.store.dispatch(new FetchLicenses());
    this.licenses = this.store.pipe(select(selectAllLicenses));
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onTextChange(value: string) {
    this.store.dispatch(new SetText(value));
  }

  public onLicensesChange({value}: MatSelectChange) {
    this.store.dispatch(new SetLicenses(value));
  }

  public onMinDateChange({value}: MatDatepickerInputEvent<Date>) {
    this.store.dispatch(new SetMinDate(value));
  }

  public onMaxDateChange({value}: MatDatepickerInputEvent<Date>) {
    this.store.dispatch(new SetMaxDate(value));
  }
}
