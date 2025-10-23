export interface WordSelection {
  word: string;
  country: string;
}

/**
 * Reads all .txt files from the dataset directory
 * @returns Array of filenames
 */
async function getDatasetFiles(): Promise<string[]> {
  const datasetPath = "./dataset";
  const files: string[] = [];

  try {
    for await (const dirEntry of Deno.readDir(datasetPath)) {
      if (dirEntry.isFile && dirEntry.name.endsWith(".txt")) {
        files.push(dirEntry.name);
      }
    }
  } catch (error) {
    console.error("Error reading dataset directory:", error);
    throw new Error("Failed to read dataset files");
  }

  if (files.length === 0) {
    throw new Error("No dataset files found in ./dataset directory");
  }

  return files.sort(); // Sort alphabetically for consistency
}

/**
 * Selects a random word from the dataset
 * Process:
 * 1. Reads all .txt files from dataset directory
 * 2. Randomly selects a country file
 * 3. Reads all words from that file
 * 4. Randomly selects a word from the file
 *
 * @returns Promise with the selected word and country code
 */
export async function getRandomWord(): Promise<WordSelection> {
  // 1. Get all dataset files dynamically
  const datasetFiles = await getDatasetFiles();
  console.log(`Found ${datasetFiles.length} dataset files`);

  // 2. Select random file from dataset
  const randomFileIndex = Math.floor(Math.random() * datasetFiles.length);
  const selectedFile = datasetFiles[randomFileIndex];
  const country = selectedFile.replace(".txt", "");

  console.log(`Selected country file: ${selectedFile}`);

  // 2. Read the file
  const filePath = `./dataset/${selectedFile}`;
  const fileContent = await Deno.readTextFile(filePath);

  // 3. Split into words (by line)
  const words = fileContent
    .split(/\r?\n/)
    .map((word) => word.trim())
    .filter((word) => word.length > 0);

  if (words.length === 0) {
    throw new Error(`No words found in file: ${selectedFile}`);
  }

  // 4. Select random word
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
export async function getAvailableCountries(): Promise<string[]> {
  const datasetFiles = await getDatasetFiles();
  return datasetFiles.map((file) => file.replace(".txt", ""));
}
