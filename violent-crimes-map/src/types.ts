export interface CrimeData {
  county: string
  year: number
  male: number
  female: number
  total: number
}

export interface CountyFeature {
  type: 'Feature'
  properties: {
    COUNTY: string
    [key: string]: any
  }
  geometry: {
    type: string
    coordinates: number[][][]
  }
}