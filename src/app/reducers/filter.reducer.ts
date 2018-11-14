import { FilterActions, FilterActionTypes } from '../actions/filter.actions';

export interface State {
  text: string;
  licenses: string[];
}

export const initialState: State = {
  text: 'dogs',
  licenses: []
};

export function reducer(state = initialState, action: FilterActions): State {
  switch (action.type) {

    case FilterActionTypes.SetText:
      return {...state, text: action.payload};

    case FilterActionTypes.SetLicenses:
      return {...state, licenses: action.payload};

    default:
      return state;
  }
}
