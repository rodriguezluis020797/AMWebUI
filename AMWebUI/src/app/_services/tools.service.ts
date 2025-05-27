import { Injectable } from '@angular/core';
import {
  CountryCodeEnum,
  StateCodeEnum,
  TimeZoneCodeEnum,
} from '../models/Enums';

const CountryCodeMap: Record<CountryCodeEnum, string> = {
  [CountryCodeEnum.Select]: CountryCodeEnum[CountryCodeEnum.Select].replaceAll(
    '_',
    ' '
  ),
  [CountryCodeEnum.United_States]: CountryCodeEnum[
    CountryCodeEnum.United_States
  ].replaceAll('_', ' '),
  /*
  [CountryCodeEnum.Mexico]: CountryCodeEnum[CountryCodeEnum.Mexico].replaceAll(
    '_',
    ' '
  ), */
};

const StateToCountryMap: Record<StateCodeEnum, CountryCodeEnum> = {

  [StateCodeEnum.Select]: CountryCodeEnum.Select,

  // 🇺🇸 United States
  [StateCodeEnum.US_AL]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_AK]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_AZ]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_AR]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_CA]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_CO]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_CT]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_DE]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_DC]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_FL]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_GA]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_HI]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_ID]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_IL]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_IN]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_IA]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_KS]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_KY]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_LA]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_ME]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_MD]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_MA]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_MI]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_MN]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_MS]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_MO]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_MT]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_NE]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_NV]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_NH]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_NJ]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_NM]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_NY]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_NC]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_ND]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_OH]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_OK]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_OR]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_PA]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_RI]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_SC]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_SD]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_TN]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_TX]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_UT]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_VT]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_VA]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_WA]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_WV]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_WI]: CountryCodeEnum.United_States,
  [StateCodeEnum.US_WY]: CountryCodeEnum.United_States,

  // 🇲🇽 Mexico
  /*
  [StateCodeEnum.MX_AG]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_BC]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_BS]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_CDMX]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_CM]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_CS]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_CH]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_CO]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_CL]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_DF]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_DG]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_GT]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_GR]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_HG]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_JA]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_MX]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_MI]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_MO]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_NA]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_NL]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_OA]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_PU]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_QE]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_QR]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_SL]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_SI]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_SO]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_TB]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_TM]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_TL]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_VE]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_YU]: CountryCodeEnum.Mexico,
  [StateCodeEnum.MX_ZA]: CountryCodeEnum.Mexico,
  */
};

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor() { }

  getCountryCodes(): { key: CountryCodeEnum; label: string }[] {
    return Object.entries(CountryCodeMap).map(([key, label]) => ({
      key: Number(key) as CountryCodeEnum,
      label,
    }));
  }

  getStateCodes(
    countryCode: CountryCodeEnum | string
  ): { key: StateCodeEnum; label: string }[] {
    const numericCountryCode = Number(countryCode);

    const stateCodes = Object.values(StateCodeEnum)
      .filter((value) => typeof value === 'number')
      .map((stateCode) => stateCode as StateCodeEnum)
      .filter(
        (stateCode) =>
          stateCode === StateCodeEnum.Select || // always include Select
          StateToCountryMap[stateCode] === numericCountryCode
      )
      .map((stateCode) => ({
        key: stateCode,
        label: StateCodeEnum[stateCode].replaceAll('_', ' '),
      }));

    // Ensure Select is first
    return stateCodes.sort((a, b) =>
      a.key === StateCodeEnum.Select
        ? -1
        : b.key === StateCodeEnum.Select
          ? 1
          : 0
    );
  }

  getTimeZoneCodes(
    countryCode: CountryCodeEnum
  ): { key: TimeZoneCodeEnum; label: string }[] {
    const countryToTimeZoneMap: Record<CountryCodeEnum, TimeZoneCodeEnum[]> = {
      [CountryCodeEnum.Select]: [],
      /*[CountryCodeEnum.Mexico]: [
        TimeZoneCodeEnum.Pacific_Standard_Time,
        TimeZoneCodeEnum.Mountain_Standard_Time,
        TimeZoneCodeEnum.Central_Standard_Time,
        TimeZoneCodeEnum.Eastern_Standard_Time,
      ], */
      [CountryCodeEnum.United_States]: [
        TimeZoneCodeEnum.Pacific_Standard_Time,
        TimeZoneCodeEnum.Mountain_Standard_Time,
        TimeZoneCodeEnum.Central_Standard_Time,
        TimeZoneCodeEnum.Eastern_Standard_Time,
        TimeZoneCodeEnum.Alaska_Standard_Time,
        TimeZoneCodeEnum.Hawaii_Standard_Time,
      ],
    };

    // Always start with Select, then append the rest (de-duplicated if necessary)
    const rawTimeZones = [
      TimeZoneCodeEnum.Select,
      ...(countryToTimeZoneMap[countryCode] || []),
    ];

    // Remove duplicates (just in case)
    const uniqueTimeZones = Array.from(new Set(rawTimeZones));

    return uniqueTimeZones.map((tz) => ({
      key: tz,
      label: TimeZoneCodeEnum[tz].replaceAll('_', ' '),
    }));
  }

  IsNullOrEmpty(str: string | null | undefined): boolean {
    return !str || str.trim().length === 0;
  }
}
