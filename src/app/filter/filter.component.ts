import { Component, OnDestroy, OnInit } from '@angular/core';
import { State as Filter } from '../reducers/filter.reducer';
import { select, Store } from '@ngrx/store';
import { RootState } from '../reducers';
import { selectFilter } from '../selectors/filter.selectors';
import { Observable, Subscription } from 'rxjs';
import { SetAuthor, SetLicenses, SetMaxDate, SetMinDate, SetText } from '../actions/filter.actions';
import { selectAllLicenses } from '../selectors/licenses.selectors';
import { License } from '../models/license.model';
import { FetchLicenses } from '../actions/license.actions';
import { MatDatepickerInputEvent, MatSelectChange } from '@angular/material';
import { emptyAuthor } from '../models/author.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  public filter: Filter;
  public licenses: Observable<License[]>;
  private subscriptions: Subscription = new Subscription();

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

  public onAuthorRemove() {
    this.store.dispatch(new SetAuthor(emptyAuthor()));
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
