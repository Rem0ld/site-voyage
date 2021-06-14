export interface Travel {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  userId: number;
  destination: string;
  fromCountry?: string;
  departureDate?: Date;
  returnDate?: Date;
  done?: boolean;
}

enum Role {
  ADMIN,
  USER,
}

type MyNotification = {
  readonly id: number;
  readonly createdAt: Date;
  updatedAt: Date;
  DateSendNotification: Date;
  readonly userId: number;
  readonly travelId: number;
}

export interface User {
  readonly id: number;
  readonly createdAt: Date;
  updatedAt: Date;
  email: string;
  username: string;
  country?: string;
  zip?: string;
  city?: string;
  role: Role;
  notifications: MyNotification[];
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
  review: Review[];
  picture: Picture[];
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

// Used for answers from the backend
export interface Payload extends Response {
  error: PrismaError;
}

export interface PrismaError extends Error {
  code: string;
  clientVersion: string;
  meta: Meta;
}

type Meta = {
  target: string[];
};

// Used in Result/Content 
export type SubItem = [string, string | number | string[] | Array<string>];

export interface Localisation {
  from: string | undefined;
  to: string | undefined;
}

export interface Review {
  readonly id: number;
  readonly createdAt: Date;
  updatedAt: Date;
  comment: string;
  score: number;
  userId: number;
  user: User;
  destination: string;
}

export interface Picture {
  readonly id: number;
  readonly createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: User;
  url: string;
  countryId: number;
}