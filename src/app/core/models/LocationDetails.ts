export interface LocationDetails {
    location: Location
  }
  
  export interface Location {
    address: string[]
    adminDistrict: string[]
    adminDistrictCode: any[]
    city: string | undefined[]
    country: string[]
    countryCode: string[]
    displayName: string[]
    displayContext: string[]
    ianaTimeZone: string[]
    latitude: number[]
    locale: Locale[]
    longitude: number[]
    neighborhood: any[]
    placeId: string[]
    postalCode: string | undefined[]
    postalKey: string | undefined[]
    disputedArea: boolean[]
    disputedCountries: any[]
    disputedCountryCodes: any[]
    disputedCustomers: any[]
    disputedShowCountry: boolean[][]
    iataCode: string | undefined[]
    icaoCode: string | undefined[]
    locId: string[]
    locationCategory: any[]
    pwsId: string | undefined[]
    type: string[]
  }
  
  export interface Locale {
    locale1: any
    locale2?: string
    locale3?: string
    locale4: any
  }
  