// generateJson.js
const fs = require("fs");
const xlsx = require("xlsx");

// Function to generate a random 9-character code (numbers and small letters)
function generateRandomCode() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 9; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// Function to read the XLSX file and extract the 'links' column
function readXlsxFile(filePath, sheetName = null) {
  const workbook = xlsx.readFile(filePath);
  const sheet = sheetName
    ? workbook.Sheets[sheetName]
    : workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

  // Assuming the links are in the first column
  const links = [];
  data.forEach((row) => {
    if (row[1]) {
      links.push(row[1]);
    }
  });
  return links;
}

// Function to update the JSON file with generated codes and links
function updateJsonWithLinks(links, jsonFilePath) {
  let jsonData = {};

  // Check if the JSON file exists and read the current content
  if (fs.existsSync(jsonFilePath)) {
    const rawData = fs.readFileSync(jsonFilePath);
    jsonData = JSON.parse(rawData);
  }

  // Iterate over the links and add them to the JSON with a unique random code
  links.forEach((link) => {
    let randomCode;
    // Generate a new unique code not already in the JSON
    do {
      randomCode = generateRandomCode();
    } while (jsonData[randomCode]);

    jsonData[randomCode] = link;
    console.log(`Added: ${randomCode} -> ${link}`);
  });

  // Write the updated JSON back to the file
  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
  console.log(`Data saved to ${jsonFilePath}`);
}

// Main function
function main() {
  const xlsxFilePath = "links.xlsx"; // Your XLSX file path
  const jsonFilePath = "data.json"; // Your JSON file path

  const links = readXlsxFile(xlsxFilePath);
  updateJsonWithLinks(links, jsonFilePath);
}

// Execute the script
main();
