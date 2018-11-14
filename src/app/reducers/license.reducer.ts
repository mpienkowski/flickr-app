import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { License } from '../models/license.model';
import { LicenseActions, LicenseActionTypes } from '../actions/license.actions';

export interface State extends EntityState<License> {
  // additional entities state properties
}

export const adapter: EntityAdapter<License> = createEntityAdapter<License>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: LicenseActions
): State {
  switch (action.type) {
    case LicenseActionTypes.AddLicense: {
      return adapter.addOne(action.payload.license, state);
    }

    case LicenseActionTypes.UpsertLicense: {
      return adapter.upsertOne(action.payload.license, state);
    }

    case LicenseActionTypes.AddLicenses: {
      return adapter.addMany(action.payload.licenses, state);
    }

    case LicenseActionTypes.UpsertLicenses: {
      return adapter.upsertMany(action.payload.licenses, state);
    }

    case LicenseActionTypes.UpdateLicense: {
      return adapter.updateOne(action.payload.license, state);
    }

    case LicenseActionTypes.UpdateLicenses: {
      return adapter.updateMany(action.payload.licenses, state);
    }

    case LicenseActionTypes.DeleteLicense: {
      return adapter.removeOne(action.payload.id, state);
    }

    case LicenseActionTypes.DeleteLicenses: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case LicenseActionTypes.LoadLicenses: {
      return adapter.addAll(action.payload.licenses, state);
    }

    case LicenseActionTypes.ClearLicenses: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
