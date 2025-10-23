/**
 * Index de todos los datasets de palabras
 * Generado automáticamente
 * Total de países: 21
 * Total de palabras: 1907
 */

export { ARG_WORDS } from './ARG';
export { BOL_WORDS } from './BOL';
export { CHL_WORDS } from './CHL';
export { COL_WORDS } from './COL';
export { CRI_WORDS } from './CRI';
export { CUB_WORDS } from './CUB';
export { DOM_WORDS } from './DOM';
export { ECU_WORDS } from './ECU';
export { ESP_WORDS } from './ESP';
export { GNQ_WORDS } from './GNQ';
export { GTM_WORDS } from './GTM';
export { HND_WORDS } from './HND';
export { MEX_WORDS } from './MEX';
export { NIC_WORDS } from './NIC';
export { PAN_WORDS } from './PAN';
export { PER_WORDS } from './PER';
export { PRI_WORDS } from './PRI';
export { PRY_WORDS } from './PRY';
export { SLV_WORDS } from './SLV';
export { URY_WORDS } from './URY';
export { VEN_WORDS } from './VEN';

/**
 * Todos los códigos de país disponibles
 */
export const COUNTRY_CODES = [
  'ARG',
  'BOL',
  'CHL',
  'COL',
  'CRI',
  'CUB',
  'DOM',
  'ECU',
  'ESP',
  'GNQ',
  'GTM',
  'HND',
  'MEX',
  'NIC',
  'PAN',
  'PER',
  'PRI',
  'PRY',
  'SLV',
  'URY',
  'VEN'
] as const;

export type CountryCode = typeof COUNTRY_CODES[number];

/**
 * Mapa de palabras por país
 */
export const WORDS_BY_COUNTRY = {
  ARG: ARG_WORDS,
  BOL: BOL_WORDS,
  CHL: CHL_WORDS,
  COL: COL_WORDS,
  CRI: CRI_WORDS,
  CUB: CUB_WORDS,
  DOM: DOM_WORDS,
  ECU: ECU_WORDS,
  ESP: ESP_WORDS,
  GNQ: GNQ_WORDS,
  GTM: GTM_WORDS,
  HND: HND_WORDS,
  MEX: MEX_WORDS,
  NIC: NIC_WORDS,
  PAN: PAN_WORDS,
  PER: PER_WORDS,
  PRI: PRI_WORDS,
  PRY: PRY_WORDS,
  SLV: SLV_WORDS,
  URY: URY_WORDS,
  VEN: VEN_WORDS,
} as const;

/**
 * Todas las palabras de todos los países
 */
export const ALL_WORDS = [
  ...ARG_WORDS,
  ...BOL_WORDS,
  ...CHL_WORDS,
  ...COL_WORDS,
  ...CRI_WORDS,
  ...CUB_WORDS,
  ...DOM_WORDS,
  ...ECU_WORDS,
  ...ESP_WORDS,
  ...GNQ_WORDS,
  ...GTM_WORDS,
  ...HND_WORDS,
  ...MEX_WORDS,
  ...NIC_WORDS,
  ...PAN_WORDS,
  ...PER_WORDS,
  ...PRI_WORDS,
  ...PRY_WORDS,
  ...SLV_WORDS,
  ...URY_WORDS,
  ...VEN_WORDS,
] as const;

/**
 * Obtiene las palabras de un país específico
 */
export function getWordsByCountry(countryCode: CountryCode): readonly string[] {
  return WORDS_BY_COUNTRY[countryCode] || [];
}

/**
 * Estadísticas de los datasets
 */
export const DATASET_STATS = {
  totalCountries: 21,
  totalWords: 1907,
  wordsByCountry: {
    ARG: 24,
    BOL: 64,
    CHL: 41,
    COL: 97,
    CRI: 38,
    CUB: 43,
    DOM: 17,
    ECU: 30,
    ESP: 889,
    GNQ: 1,
    GTM: 21,
    HND: 40,
    MEX: 57,
    NIC: 58,
    PAN: 52,
    PER: 44,
    PRI: 58,
    PRY: 5,
    SLV: 20,
    URY: 18,
    VEN: 290
  }
} as const;
