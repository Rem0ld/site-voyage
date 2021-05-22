export interface User {
  username: string;
  notifCount: number;
  isConnected: boolean;
}

export interface Hobby {
  [key: string]: {
    isChecked: boolean;
    list: undefined;
  };
}

export interface Continent {
  [key: string]: {
    list: Country[];
    isChecked: boolean;
  };
}

export type Filter = {
  [key in "continents" | "hobbies"]: Continent | Hobby;
};

export interface Country {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  region: string;
  subregion: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  gini: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  currencies: Currency[];
  languages: Language[];
  translations: string[];
  flag: string;
  regionalBlocs: RegionalBlocs[];
  cioc: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Language {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

export interface RegionalBlocs {
  acronym: string;
  name: string;
  otherAcronyms?: [];
  otherNames?: []
}

