import { T as client } from "../config";
import fs from "fs";
import logger from "./logger"; // Import logger

// Simplified getLang function
// Exported for testing
export function getLang(): string {
  return "ESP";
}

// Exported for testing
export function getDataSet(filelang: string): string[] {
  const filePath = `./dataset/${filelang}.txt`;
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return data.split(/\r?\n/).filter((word) => word.trim() !== ""); // Ensure no empty words
  } catch (error) {
    logger.error(`Error reading dataset file: ${filePath}`, error); // Log error
    throw new Error(`Failed to load dataset for language: ${filelang}`);
  }
}

export let loadedBadWords: string[] = [];

// Exported for testing
export function initializeWordCache(): void {
  try {
    const lang = getLang();
    loadedBadWords = getDataSet(lang);
    if (loadedBadWords.length === 0) {
      logger.error(`Dataset for language ${lang} is empty.`); // Log error
      throw new Error(`Dataset for language ${lang} is empty.`);
    }
    logger.info(
      `Successfully loaded ${loadedBadWords.length} words for language ${lang}.`,
    ); // Log success
  } catch (error) {
    // Error is already logged by getDataSet or here if empty
    // Re-throw to ensure application startup fails if dataset is crucial
    logger.error("Failed to initialize word cache.", error);
    throw error;
  }
}

export async function postRandomWordTweet() {
  if (loadedBadWords.length === 0) {
    logger.error("Word cache is not initialized or empty."); // Log error
    // Optionally, try to re-initialize, or throw an error
    // For now, throwing an error to indicate a critical issue.
    throw new Error("Word cache is not available.");
  }

  const aleat: number = Math.round(Math.random() * (loadedBadWords.length - 1));
  const wordofhour: string = loadedBadWords[aleat];

  const tweet = await client.v2.tweet("Que te pasa, " + wordofhour + "?");
  const datatweet = tweet.data.id;

  return { datatweet };
}

// Test helper to manually set loadedBadWords
export const __setLoadedBadWords = (words: string[]): void => {
  loadedBadWords = words;
};

// Initialize the word cache when the module is loaded
try {
  initializeWordCache();
} catch (error) {
  logger.error(
    "Critical failure during application startup: Word cache initialization failed.",
    error,
  );
  // Depending on the application's needs, you might want to exit the process
  // process.exit(1);
}
