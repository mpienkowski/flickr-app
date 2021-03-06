import { FilterActions, FilterActionTypes } from '../actions/filter.actions';
import { LatLngBounds } from '@agm/core';
import { Author, emptyAuthor } from '../models/author.model';

export interface State {
  text: string;
  licenses: string[];
  minDate: Date;
  maxDate: Date;
  bbox: LatLngBounds;
  author: Author;
}

export const initialState: State = {
  text: 'dog',
  licenses: [],
  minDate: null,
  maxDate: null,
  bbox: null,
  author: emptyAuthor()
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

    case FilterActionTypes.SetAuthor:
      return {...initialState, text: '', bbox: state.bbox, author: action.payload};

    default:
      return state;
  }
}
