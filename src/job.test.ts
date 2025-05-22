import fs from "fs";
import {
  getLang,
  getDataSet,
  postRandomWordTweet,
  initializeWordCache,
  // loadedBadWords, // Removed unused import
  __setLoadedBadWords, // Test helper
} from "./job"; // Adjust path as necessary
import logger from "./logger"; // Import logger to mock its methods if needed

// Mock 'fs'
jest.mock("fs");

// Mock '../config' for the Twitter client
jest.mock("../config", () => ({
  T: {
    v2: {
      tweet: jest.fn(),
    },
  },
}));

// Import the mocked client for assertions
import { T } from "../config";
// eslint-disable-next-line @typescript-eslint/unbound-method
const mockTweet = T.v2.tweet as jest.Mock;

// Mock logger
jest.mock("./logger", () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
}));

describe("Job Tests", () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset loadedBadWords for tests that rely on initializeWordCache or its direct manipulation
    __setLoadedBadWords([]);
  });

  describe("getLang", () => {
    it('should return "ESP"', () => {
      expect(getLang()).toBe("ESP");
    });
  });

  describe("getDataSet", () => {
    const mockReadFileSync = fs.readFileSync as jest.Mock;

    it("should parse data correctly from file", () => {
      mockReadFileSync.mockReturnValue("word1\nword2\r\nword3\n");
      const result = getDataSet("TESTLANG");
      expect(result).toEqual(["word1", "word2", "word3"]);
      expect(mockReadFileSync).toHaveBeenCalledWith(
        "./dataset/TESTLANG.txt",
        "utf-8",
      );
    });

    it("should return an empty array if file is empty", () => {
      mockReadFileSync.mockReturnValue("");
      const result = getDataSet("TESTLANG");
      expect(result).toEqual([]);
    });

    it("should filter out empty lines", () => {
      mockReadFileSync.mockReturnValue("word1\n\nword2\r\n\r\nword3");
      const result = getDataSet("TESTLANG");
      expect(result).toEqual(["word1", "word2", "word3"]);
    });

    it("should throw an error if fs.readFileSync fails", () => {
      mockReadFileSync.mockImplementation(() => {
        throw new Error("File read error");
      });
      expect(() => getDataSet("TESTLANG")).toThrow(
        "Failed to load dataset for language: TESTLANG",
      );
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining(
          "Error reading dataset file: ./dataset/TESTLANG.txt",
        ),
        expect.any(Error),
      );
    });
  });

  describe("initializeWordCache and loadedBadWords", () => {
    // const mockReadFileSync = fs.readFileSync as jest.Mock; // Removed unused variable

    it("should populate loadedBadWords on successful dataset load", async () => {
      // Made async
      // This test relies on the module-level call to initializeWordCache.
      // To test it in isolation, we would need to use jest.resetModules() and re-import.
      // For simplicity, we'll assume getDataSet works and test the outcome.
      // We need to ensure getDataSet is mocked *before* the module containing initializeWordCache is imported
      // or use jest.isolateModules for more granular control.
      // Given the current setup, we'll test the state after the implicit call.

      // To properly test initializeWordCache, we need to reset modules or ensure this runs before module load.
      // For now, we'll directly call it and check loadedBadWords.
      // Or better, mock getDataSet for the initializeWordCache call.

      await jest.isolateModulesAsync(async () => {
        // Use isolateModulesAsync
        const jobModule = await import("./job"); // Use dynamic import
        (fs.readFileSync as jest.Mock).mockReturnValue("hola\nmundo");
        jobModule.initializeWordCache(); // Manually call if not relying on module load, or ensure mocks are up for module load
        expect(jobModule.loadedBadWords).toEqual(["hola", "mundo"]);
        expect(logger.info).toHaveBeenCalledWith(
          expect.stringContaining(
            "Successfully loaded 2 words for language ESP.",
          ),
        );
      });
    });

    it("should throw error and log if dataset is empty", () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(""); // getDataSet will return []
      expect(() => initializeWordCache()).toThrow(
        "Dataset for language ESP is empty.",
      );
      expect(logger.error).toHaveBeenCalledWith(
        "Dataset for language ESP is empty.",
      );
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining("Failed to initialize word cache."),
        expect.any(Error),
      );
    });

    it("should throw error and log if getDataSet throws", () => {
      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw new Error("FS Read Error");
      });
      expect(() => initializeWordCache()).toThrow(
        "Failed to load dataset for language: ESP",
      );
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining(
          "Error reading dataset file: ./dataset/ESP.txt",
        ),
        expect.any(Error),
      );
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining("Failed to initialize word cache."),
        expect.any(Error),
      );
    });
  });

  describe("postRandomWordTweet", () => {
    beforeEach(() => {
      // Ensure loadedBadWords has data for these tests
      __setLoadedBadWords(["testword1", "testword2", "another"]);
      mockTweet.mockClear(); // Clear only mockTweet history
    });

    it("should post a tweet with a random word from loadedBadWords", async () => {
      mockTweet.mockResolvedValue({ data: { id: "tweet123" } });

      const result = await postRandomWordTweet();

      expect(mockTweet).toHaveBeenCalledTimes(1);
      // Check if the tweet text matches the expected format with any of the loaded words
      expect(mockTweet).toHaveBeenCalledWith(
        expect.stringMatching(/^Que te pasa, (testword1|testword2|another)\?$/),
      );
      expect(result).toEqual({ datatweet: "tweet123" });
    });

    it("should throw an error if loadedBadWords is empty", async () => {
      __setLoadedBadWords([]); // Set to empty for this specific test

      await expect(postRandomWordTweet()).rejects.toThrow(
        "Word cache is not available.",
      );
      expect(mockTweet).not.toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith(
        "Word cache is not initialized or empty.",
      );
    });

    it("should handle errors from Twitter API", async () => {
      const apiError = new Error("Twitter API Error");
      mockTweet.mockRejectedValue(apiError);

      await expect(postRandomWordTweet()).rejects.toThrow("Twitter API Error");
      expect(mockTweet).toHaveBeenCalledTimes(1);
    });

    it("should select a word based on Math.random", async () => {
      // Mock Math.random to control word selection
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 0.5; // Should select 'testword2' from ['testword1', 'testword2', 'another']
      global.Math = mockMath;

      mockTweet.mockResolvedValue({ data: { id: "tweet789" } });
      await postRandomWordTweet();
      expect(mockTweet).toHaveBeenCalledWith("Que te pasa, testword2?");

      // Restore original Math object
      global.Math = Object.getPrototypeOf(mockMath);
    });
  });
});
