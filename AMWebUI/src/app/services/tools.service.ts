import { Injectable } from '@angular/core';
import { CountryCodeEnum, StateCodeEnum } from '../models/Enums';

const CountryCodeMap: Record<CountryCodeEnum, string> = {
  [CountryCodeEnum.Select]: CountryCodeEnum[CountryCodeEnum.Select].replaceAll(
    '_',
    ' '
  ),
  [CountryCodeEnum.United_States]: CountryCodeEnum[
    CountryCodeEnum.United_States
  ].replaceAll('_', ' '),
  [CountryCodeEnum.Mexico]: CountryCodeEnum[CountryCodeEnum.Mexico].replaceAll(
    '_',
    ' '
  ),
};

const StateToCountryMap: Record<StateCodeEnum, CountryCodeEnum> = {
  [StateCodeEnum.Select]: CountryCodeEnum.Select,

  // Mexico
  [StateCodeEnum.Aguascalientes]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Baja_California]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Baja_California_Sur]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Campeche]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Chiapas]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Chihuahua]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Ciudad_de_México]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Coahuila]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Colima]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Durango]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Guanajuato]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Guerrero]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Hidalgo]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Jalisco]: CountryCodeEnum.Mexico,
  [StateCodeEnum.México]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Michoacán]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Morelos]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Nayarit]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Nuevo_León]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Oaxaca]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Puebla]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Querétaro]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Quintana_Roo]: CountryCodeEnum.Mexico,
  [StateCodeEnum.San_Luis_Potosí]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Sinaloa]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Sonora]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Tabasco]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Tamaulipas]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Tlaxcala]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Veracruz]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Yucatán]: CountryCodeEnum.Mexico,
  [StateCodeEnum.Zacatecas]: CountryCodeEnum.Mexico,

  // United States
  [StateCodeEnum.Alabama]: CountryCodeEnum.United_States,
  [StateCodeEnum.Alaska]: CountryCodeEnum.United_States,
  [StateCodeEnum.Arizona]: CountryCodeEnum.United_States,
  [StateCodeEnum.Arkansas]: CountryCodeEnum.United_States,
  [StateCodeEnum.California]: CountryCodeEnum.United_States,
  [StateCodeEnum.Colorado]: CountryCodeEnum.United_States,
  [StateCodeEnum.Connecticut]: CountryCodeEnum.United_States,
  [StateCodeEnum.Delaware]: CountryCodeEnum.United_States,
  [StateCodeEnum.District_of_Columbia]: CountryCodeEnum.United_States,
  [StateCodeEnum.Florida]: CountryCodeEnum.United_States,
  [StateCodeEnum.Georgia]: CountryCodeEnum.United_States,
  [StateCodeEnum.Hawaii]: CountryCodeEnum.United_States,
  [StateCodeEnum.Idaho]: CountryCodeEnum.United_States,
  [StateCodeEnum.Illinois]: CountryCodeEnum.United_States,
  [StateCodeEnum.Indiana]: CountryCodeEnum.United_States,
  [StateCodeEnum.Iowa]: CountryCodeEnum.United_States,
  [StateCodeEnum.Kansas]: CountryCodeEnum.United_States,
  [StateCodeEnum.Kentucky]: CountryCodeEnum.United_States,
  [StateCodeEnum.Louisiana]: CountryCodeEnum.United_States,
  [StateCodeEnum.Maine]: CountryCodeEnum.United_States,
  [StateCodeEnum.Maryland]: CountryCodeEnum.United_States,
  [StateCodeEnum.Massachusetts]: CountryCodeEnum.United_States,
  [StateCodeEnum.Michigan]: CountryCodeEnum.United_States,
  [StateCodeEnum.Minnesota]: CountryCodeEnum.United_States,
  [StateCodeEnum.Mississippi]: CountryCodeEnum.United_States,
  [StateCodeEnum.Missouri]: CountryCodeEnum.United_States,
  [StateCodeEnum.Montana]: CountryCodeEnum.United_States,
  [StateCodeEnum.Nebraska]: CountryCodeEnum.United_States,
  [StateCodeEnum.Nevada]: CountryCodeEnum.United_States,
  [StateCodeEnum.New_Hampshire]: CountryCodeEnum.United_States,
  [StateCodeEnum.New_Jersey]: CountryCodeEnum.United_States,
  [StateCodeEnum.New_Mexico]: CountryCodeEnum.United_States,
  [StateCodeEnum.New_York]: CountryCodeEnum.United_States,
  [StateCodeEnum.North_Carolina]: CountryCodeEnum.United_States,
  [StateCodeEnum.North_Dakota]: CountryCodeEnum.United_States,
  [StateCodeEnum.Ohio]: CountryCodeEnum.United_States,
  [StateCodeEnum.Oklahoma]: CountryCodeEnum.United_States,
  [StateCodeEnum.Oregon]: CountryCodeEnum.United_States,
  [StateCodeEnum.Pennsylvania]: CountryCodeEnum.United_States,
  [StateCodeEnum.Rhode_Island]: CountryCodeEnum.United_States,
  [StateCodeEnum.South_Carolina]: CountryCodeEnum.United_States,
  [StateCodeEnum.South_Dakota]: CountryCodeEnum.United_States,
  [StateCodeEnum.Tennessee]: CountryCodeEnum.United_States,
  [StateCodeEnum.Texas]: CountryCodeEnum.United_States,
  [StateCodeEnum.Utah]: CountryCodeEnum.United_States,
  [StateCodeEnum.Vermont]: CountryCodeEnum.United_States,
  [StateCodeEnum.Virginia]: CountryCodeEnum.United_States,
  [StateCodeEnum.Washington]: CountryCodeEnum.United_States,
  [StateCodeEnum.West_Virginia]: CountryCodeEnum.United_States,
  [StateCodeEnum.Wisconsin]: CountryCodeEnum.United_States,
  [StateCodeEnum.Wyoming]: CountryCodeEnum.United_States,
};

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor() {}

  getCountryCodes(): { key: CountryCodeEnum; label: string }[] {
    return Object.entries(CountryCodeMap).map(([key, label]) => ({
      key: Number(key) as CountryCodeEnum,
      label,
    }));
  }

  getStateCodes(
    countryCode: CountryCodeEnum
  ): { key: StateCodeEnum; label: string }[] {
    return Object.entries(StateToCountryMap)
      .filter(([, mappedCountry]) => mappedCountry === countryCode)
      .map(([stateKey]) => {
        const key = Number(stateKey) as StateCodeEnum;
        const label = StateCodeEnum[key].replaceAll('_', ' ');
        return { key, label };
      });
  }
}
