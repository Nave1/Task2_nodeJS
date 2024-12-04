import { createReadStream, createWriteStream } from 'fs';
import { createInterface } from 'readline';

async function mergeFiles(inputFiles, outputFile) {
  const outputStream = createWriteStream(outputFile);

  for (let i = 0; i < inputFiles.length; i++) {
    const inputFile = inputFiles[i];
    const linesToCopy = i + 1;

    const fileStream = createReadStream(inputFile); // פותח קובץ קלט
    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let lineCount = 0;

    for await (const line of rl) {
      if (lineCount < linesToCopy) {
        outputStream.write(line + '\n'); // כותב לקובץ הפלט
        lineCount++;
      } else {
        break; // עובר לקובץ הבא
      }
    }
  }

  outputStream.end(); // מסיים את כתיבת קובץ הפלט
  console.log(`Merge completed. Output written to "${outputFile}".`);
}

// דוגמה לשימוש
const inputFiles = [
  'file1.txt',
  'file2.txt',
  'file3.txt',
  'file4.txt',
  'file5.txt',
  'file6.txt',
  'file7.txt',
  'file8.txt',
  'file9.txt',
  'file10.txt',
];
const outputFile = 'merged_output.txt';

mergeFiles(inputFiles, outputFile);
