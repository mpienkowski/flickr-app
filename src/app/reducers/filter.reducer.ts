import { FilterActions, FilterActionTypes } from '../actions/filter.actions';

export interface State {
  text: string;
}

export const initialState: State = {
  text: 'dogs'
};

export function reducer(state = initialState, action: FilterActions): State {
  switch (action.type) {

    case FilterActionTypes.SetText:
      return {...state, text: action.payload};

    default:
      return state;
  }
}
