// this scripts helps in creating the JSON data from EXCEL sheet
// it will create the JSON file with name as the sheet name in the excel
// if any sheet got deleted then the respective json file will also automatically get deleted 
// column header is the property name and respective value 


//------------------------------PRE-REQUISITE -----------------
//npm init -y
//npm install playwright exceljs


//---------------------------------------UPDATE--------------------------------------------------------

// <<<<<<<<<<<<<<<<<<<<------------------node tests\excelToJsonScript.js  ------------->>>>>>>>>>>>>>>>>  
// const excelFilePath = 'C:/Users/Amit/Desktop/optum cypress/data.xlsx'; // Replace with the actual path to your Excel file
//const outputFolder = 'json data'; // Replace with the desired output folder





const { chromium } = require('playwright');
const ExcelJS = require('exceljs');
const fs = require('fs/promises');
const path = require('path');

async function convertExcelToJSON(excelFilePath, outputFolder) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelFilePath);

    // Get the list of existing JSON files in the output folder
    const existingJsonFiles = await fs.readdir(outputFolder);

    for (const existingJsonFile of existingJsonFiles) {
      // Check if the JSON file corresponds to an existing sheet in the Excel file
      const sheetName = path.parse(existingJsonFile).name;
      const worksheet = workbook.getWorksheet(sheetName);

      if (!worksheet) {
        // Sheet doesn't exist anymore, remove the JSON file
        const jsonFilePath = path.join(outputFolder, existingJsonFile);
        await fs.unlink(jsonFilePath);
        console.log(`Removed JSON file for sheet '${sheetName}' as the sheet is no longer present.`);
      }
    }

    for (const worksheet of workbook.worksheets) {
      const sheetName = worksheet.name;
      const jsonData = [];

      const headerRow = worksheet.getRow(1).values;

      worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        if (rowNumber !== 1) {
          const rowData = {};
          row.eachCell((cell, colNumber) => {
            const header = headerRow[colNumber];
            rowData[header] = cell.value;
          });
          jsonData.push(rowData);
        }
      });

      const jsonFileName = path.join(outputFolder, `${sheetName}.json`);
      await fs.writeFile(jsonFileName, JSON.stringify(jsonData, null, 2));

      console.log(`Conversion completed for ${sheetName}.`);
    }

    console.log('Excel to JSON conversion completed.');
  } catch (error) {
    console.error('Error converting Excel to JSON:', error.message);
  } finally {
    await browser.close();
  }
}

const excelFilePath = 'C:/Users/Amit/Desktop/optum cypress/data.xlsx'; // Replace with the actual path to your Excel file
const outputFolder = 'json data'; // Replace with the desired output folder

convertExcelToJSON(excelFilePath, outputFolder);
