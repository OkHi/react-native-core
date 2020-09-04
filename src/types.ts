export interface OkHiUser {
  phone: string;
  firstName?: string;
  lastName?: string;
  id?: string;
}

export interface OkHiAppContext {
  mode: 'sandbox' | 'prod' | string;
  app?: {
    name: string;
    version: string;
    build: number;
  };
  developer?: string;
}

export interface OkHiLocation {
  lat: number;
  lon: number;
  id?: string;
  placeId?: string;
  plusCode?: string;
  propertyName?: string;
  streetName?: string;
  title?: string;
  subtitle?: string;
  directions?: string;
  otherInformation?: string;
  url?: string;
  streetViewPanoId?: string;
  streetViewPanoUrl?: string;
  userId?: string;
  propertyNumber?: string;
  photo?: string;
}

export interface OkHiError {
  code: string;
  message: string;
}

export type OkHiAccessScope = 'verify' | 'address' | 'checkout' | 'profile';
