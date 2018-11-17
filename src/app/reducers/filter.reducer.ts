import { FilterActions, FilterActionTypes } from '../actions/filter.actions';
import { LatLngBounds } from '@agm/core';

export interface State {
  text: string;
  licenses: string[];
  minDate: Date;
  maxDate: Date;
  bbox: LatLngBounds;
}

export const initialState: State = {
  text: 'dogs',
  licenses: [],
  minDate: null,
  maxDate: null,
  bbox: null
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

    case FilterActionTypes.SetBbox:
      return {...state, bbox: action.payload};

    default:
      return state;
  }
}
