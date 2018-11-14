import { Component, OnDestroy, OnInit } from '@angular/core';
import { State } from '../reducers/filter.reducer';
import { select, Store } from '@ngrx/store';
import { RootState } from '../reducers';
import { selectFilter } from '../selectors/filter.selectors';
import { Observable, Subscription } from 'rxjs';
import { SetLicenses, SetText } from '../actions/filter.actions';
import { selectAllLicenses } from '../selectors/licenses.selectors';
import { License } from '../models/license.model';
import { FetchLicenses } from '../actions/license.actions';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  public filter: State;
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

  public onTextChange() {
    this.store.dispatch(new SetText(this.filter.text));
  }

  public onLicensesChange() {
    console.log(this.filter.licenses);
    this.store.dispatch(new SetLicenses(this.filter.licenses));
  }
}
