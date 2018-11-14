import { Component, OnDestroy, OnInit } from '@angular/core';
import { State } from '../reducers/filter.reducer';
import { select, Store } from '@ngrx/store';
import { RootState } from '../reducers';
import { selectFilter } from '../selectors/filter.selectors';
import { Subscription } from 'rxjs';
import { SetText } from '../actions/filter.actions';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  public filter: State;
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store<RootState>) {
  }

  public ngOnInit() {
    this.subscriptions.add(
      this.store.pipe(select(selectFilter))
        .subscribe(filter => this.filter = filter)
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onTextChange() {
    this.store.dispatch(new SetText(this.filter.text));
  }
}
