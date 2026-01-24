#!/usr/bin/env node

/**
 * No Opinion Guard
 * Validates that UI copy contains no opinion, speculation, or prediction.
 * Fails the build if banned words are found.
 */

const fs = require("fs");
const path = require("path");

// Banned words list
const BANNED_WORDS = {
  // Adjectives (subjective qualifiers)
  adjectives: [
    "amazing",
    "awful",
    "brilliant",
    "controversial",
    "disappointing",
    "excellent",
    "exciting",
    "fantastic",
    "great",
    "horrible",
    "impressive",
    "incredible",
    "outstanding",
    "poor",
    "stunning",
    "superb",
    "terrible",
    "thrilling",
    "tremendous",
    "underwhelming",
    "unfortunate",
    "unlucky",
    "wonderful",
    "worst",
    "best",
  ],

  // Speculation words
  speculation: [
    "allegedly",
    "apparently",
    "could",
    "likely",
    "maybe",
    "might",
    "perhaps",
    "possibly",
    "presumably",
    "probably",
    "reportedly",
    "rumored",
    "rumoured",
    "seems",
    "supposedly",
    "unlikely",
  ],

  // Prediction words
  prediction: [
    "destined",
    "expected",
    "going to",
    "gonna",
    "predicted",
    "should win",
    "should lose",
    "will win",
    "will lose",
    "would win",
    "would lose",
  ],

  // Analysis language
  analysis: [
    "arguably",
    "clearly",
    "crucial",
    "deserved",
    "dominated",
    "epic",
    "gutsy",
    "heroic",
    "key player",
    "man of the match",
    "masterclass",
    "must-win",
    "outclassed",
    "outplayed",
    "pivotal",
    "star",
    "undeserved",
    "vital",
  ],
};

// Flatten all banned words into a single array with categories
const allBannedWords = [];
for (const [category, words] of Object.entries(BANNED_WORDS)) {
  for (const word of words) {
    allBannedWords.push({ word: word.toLowerCase(), category });
  }
}

// Sort by length (longest first) to match multi-word phrases before single words
allBannedWords.sort((a, b) => b.word.length - a.word.length);

// Files to scan
const SRC_DIR = path.join(__dirname, "..", "src");
const EXTENSIONS = [".tsx", ".ts"];

// Directories/files to skip
const SKIP_PATTERNS = [
  "no-opinion-guard",
  "node_modules",
  ".next",
];

function getAllFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Skip certain paths
    if (SKIP_PATTERNS.some((p) => fullPath.includes(p))) {
      continue;
    }

    if (entry.isDirectory()) {
      getAllFiles(fullPath, files);
    } else if (EXTENSIONS.some((ext) => entry.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractStrings(content) {
  const strings = [];

  // Match JSX text content: >text<
  const jsxTextRegex = />([^<>{]+)</g;
  let match;
  while ((match = jsxTextRegex.exec(content)) !== null) {
    const text = match[1].trim();
    if (text && !/^[\s\d\-—·,.():;]+$/.test(text)) {
      strings.push({ text, index: match.index });
    }
  }

  // Match string literals in JSX attributes: "text" or 'text'
  // Focus on user-facing attributes: title, alt, placeholder, aria-label
  const attrRegex = /(?:title|alt|placeholder|aria-label|description)=["']([^"']+)["']/gi;
  while ((match = attrRegex.exec(content)) !== null) {
    strings.push({ text: match[1], index: match.index });
  }

  // Match template literals with text: `text`
  const templateRegex = /[`]([^`]+)[`]/g;
  while ((match = templateRegex.exec(content)) !== null) {
    const text = match[1].trim();
    if (text && !text.includes("${") && !/^[\s\d\-—·,.():;/]+$/.test(text)) {
      strings.push({ text, index: match.index });
    }
  }

  return strings;
}

function getLineNumber(content, index) {
  return content.substring(0, index).split("\n").length;
}

function checkForBannedWords(text) {
  const violations = [];
  const lowerText = text.toLowerCase();

  for (const { word, category } of allBannedWords) {
    // Word boundary check for single words, substring for phrases
    const regex = word.includes(" ")
      ? new RegExp(word.replace(/\s+/g, "\\s+"), "gi")
      : new RegExp(`\\b${word}\\b`, "gi");

    if (regex.test(lowerText)) {
      violations.push({ word, category });
    }
  }

  return violations;
}

function main() {
  console.log("🔍 No Opinion Guard: Scanning for banned words...\n");

  const files = getAllFiles(SRC_DIR);
  const allViolations = [];

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, "utf-8");
    const strings = extractStrings(content);
    const relativePath = path.relative(process.cwd(), filePath);

    for (const { text, index } of strings) {
      const violations = checkForBannedWords(text);

      for (const { word, category } of violations) {
        const lineNumber = getLineNumber(content, index);
        allViolations.push({
          file: relativePath,
          line: lineNumber,
          word,
          category,
          context: text.substring(0, 60) + (text.length > 60 ? "..." : ""),
        });
      }
    }
  }

  if (allViolations.length > 0) {
    console.error("❌ NO OPINION VIOLATION(S) FOUND:\n");

    for (const v of allViolations) {
      console.error(`  ${v.file}:${v.line}`);
      console.error(`    Banned word: "${v.word}" (${v.category})`);
      console.error(`    Context: "${v.context}"\n`);
    }

    console.error(`\nTotal violations: ${allViolations.length}`);
    console.error("Build failed. Remove all opinion from UI copy.\n");
    process.exit(1);
  }

  console.log(`✅ No opinion found. Scanned ${files.length} files.\n`);
  process.exit(0);
}

main();
