export interface WordSelection {
  word: string;
  country: string;
}

/**
 * Lista de códigos de países disponibles
 * Se mantiene aquí para evitar problemas con el sistema de archivos en Edge Functions
 */
const COUNTRY_FILES = [
  "ARG",
  "BOL",
  "CHL",
  "COL",
  "CRI",
  "CUB",
  "DOM",
  "ECU",
  "ESP",
  "GNQ",
  "GTM",
  "HND",
  "MEX",
  "NIC",
  "PAN",
  "PER",
  "PRI",
  "PRY",
  "SLV",
  "URY",
  "VEN",
];

/**
 * Selects a random word from the dataset
 * Process:
 * 1. Randomly selects a country file
 * 2. Dynamically imports that country's word array
 * 3. Randomly selects a word from the list
 *
 * @returns The selected word and country code
 */
export async function getRandomWord(): Promise<WordSelection> {
  // 1. Select random country file
  const randomCountryIndex = Math.floor(Math.random() * COUNTRY_FILES.length);
  const country = COUNTRY_FILES[randomCountryIndex];

  console.log(`Selected country: ${country}`);

  // 2. Dynamically import the country's dataset file
  const countryModule = await import(`./dataset/${country}.ts`);
  const words = countryModule[`${country}_WORDS`];

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
