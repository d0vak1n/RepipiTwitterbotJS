import {
  COUNTRY_CODES,
  WORDS_BY_COUNTRY,
  DATASET_STATS,
  type CountryCode,
} from "./dataset/index.ts";

export interface WordSelection {
  word: string;
  country: string;
}

/**
 * Selects a random word from the dataset
 * Process:
 * 1. Randomly selects a country from available countries
 * 2. Gets all words from that country's dataset
 * 3. Randomly selects a word from the list
 *
 * @returns The selected word and country code
 */
export function getRandomWord(): WordSelection {
  // 1. Select random country
  const randomCountryIndex = Math.floor(Math.random() * COUNTRY_CODES.length);
  const country = COUNTRY_CODES[randomCountryIndex] as CountryCode;

  console.log(`Selected country: ${country}`);

  // 2. Get words for selected country
  const words = WORDS_BY_COUNTRY[country];

  if (!words || words.length === 0) {
    throw new Error(`No words found for country: ${country}`);
  }

  // 3. Select random word
  const randomWordIndex = Math.floor(Math.random() * words.length);
  const selectedWord = words[randomWordIndex];

  console.log(
    `Selected word: ${selectedWord} from ${country} (${words.length} words available)`
  );

  return { word: selectedWord, country };
}

/**
 * Gets the list of available country codes in the dataset
 * @returns Array of country codes
 */
export function getAvailableCountries(): readonly string[] {
  return COUNTRY_CODES;
}

/**
 * Gets dataset statistics
 * @returns Object with dataset statistics
 */
export function getDatasetStats() {
  return DATASET_STATS;
}
