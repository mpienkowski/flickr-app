import { FilterActions, FilterActionTypes } from '../actions/filter.actions';

export interface State {
  text: string;
  licenses: string[];
  minDate: Date;
  maxDate: Date;
}

export const initialState: State = {
  text: 'dogs',
  licenses: [],
  minDate: null,
  maxDate: null
};

export function reducer(state = initialState, action: FilterActions): State {
  switch (action.type) {

    case FilterActionTypes.SetText:
      return {...state, text: action.payload};

    case FilterActionTypes.SetLicenses:
      return {...state, licenses: action.payload};

    case FilterActionTypes.SetMinDate:
      return {...state, minDate: action.payload};

    case FilterActionTypes.SetMaxDate:
      return {...state, maxDate: action.payload};

    default:
      return state;
  }
}
