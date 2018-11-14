import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { License } from '../models/license.model';

export enum LicenseActionTypes {
  LoadLicenses = '[License] Load Licenses',
  AddLicense = '[License] Add License',
  UpsertLicense = '[License] Upsert License',
  AddLicenses = '[License] Add Licenses',
  UpsertLicenses = '[License] Upsert Licenses',
  UpdateLicense = '[License] Update License',
  UpdateLicenses = '[License] Update Licenses',
  DeleteLicense = '[License] Delete License',
  DeleteLicenses = '[License] Delete Licenses',
  ClearLicenses = '[License] Clear Licenses',
  FetchLicenses = '[License] Fetch Licenses',
  FetchFailed = '[License] Fetch Failed',
}

export class LoadLicenses implements Action {
  readonly type = LicenseActionTypes.LoadLicenses;

  constructor(public payload: { licenses: License[] }) {}
}

export class AddLicense implements Action {
  readonly type = LicenseActionTypes.AddLicense;

  constructor(public payload: { license: License }) {}
}

export class UpsertLicense implements Action {
  readonly type = LicenseActionTypes.UpsertLicense;

  constructor(public payload: { license: License }) {}
}

export class AddLicenses implements Action {
  readonly type = LicenseActionTypes.AddLicenses;

  constructor(public payload: { licenses: License[] }) {}
}

export class UpsertLicenses implements Action {
  readonly type = LicenseActionTypes.UpsertLicenses;

  constructor(public payload: { licenses: License[] }) {}
}

export class UpdateLicense implements Action {
  readonly type = LicenseActionTypes.UpdateLicense;

  constructor(public payload: { license: Update<License> }) {}
}

export class UpdateLicenses implements Action {
  readonly type = LicenseActionTypes.UpdateLicenses;

  constructor(public payload: { licenses: Update<License>[] }) {}
}

export class DeleteLicense implements Action {
  readonly type = LicenseActionTypes.DeleteLicense;

  constructor(public payload: { id: string }) {}
}

export class DeleteLicenses implements Action {
  readonly type = LicenseActionTypes.DeleteLicenses;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearLicenses implements Action {
  readonly type = LicenseActionTypes.ClearLicenses;
}

export class FetchLicenses implements Action {
  readonly type = LicenseActionTypes.FetchLicenses;
}

export class FetchFailed implements Action {
  readonly type = LicenseActionTypes.FetchFailed;
}

export type LicenseActions =
 LoadLicenses
 | AddLicense
 | UpsertLicense
 | AddLicenses
 | UpsertLicenses
 | UpdateLicense
 | UpdateLicenses
 | DeleteLicense
 | DeleteLicenses
 | ClearLicenses
 | FetchLicenses
 | FetchFailed;
