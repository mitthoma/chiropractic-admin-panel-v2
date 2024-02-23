import * as fs from 'fs';
import * as ExcelJS from 'exceljs';
import { getNoteById } from '~~/server/repositories/noteRepository';
import { getAllEntriesByNoteId } from '~~/server/repositories/entryRepository';
import { getAllTreatmentsByNoteId } from '~~/server/repositories/treatmentRepository';
import { Treatment } from '~~/types/datamodel';

// eslint-disable-next-line prettier/prettier
const COL_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

/**
 * Ranges of columns for each finding type. Note: this is 0-based, since we use it to find the corresponding letter from the COLS array.
 */
const COL_RANGES = {
  OF: [3, 13],
  PHYS: [15, 23], // broke this into its own range since we skip a column to add space
};

/**
 * Ranges of rows for each level. NOTE: this is 1-based, not 0-based!
 * This is because we want the actual row number shown in the spreadsheet.
 */
const ROW_RANGES = {
  C: [17, 24], // spinal levels table
  T: [26, 37],
  L: [39, 43],
  S: [45, 49],
  EXT: [56, 69], // extremities table
};

const LEVELS = {
  C: ['occ', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'],
  // eslint-disable-next-line prettier/prettier
  T: ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10', 't11', 't12'],
  L: ['l1', 'l2', 'l3', 'l4', 'l5'],
  S: ['s1', 's2', 's3', 's4', 's5'],
};

// eslint-disable-next-line prettier/prettier
const EXTREMITIES = ['shoulder', 'arm', 'bicep', 'tricep', 'elbow', 'wrist', 'hand', 'hip', 'thigh', 'leg', 'knee', 'calf', 'ankle', 'foot'];


/** objective findings (their key values) in the order they appear in the spreadsheet.
make sure this matches the order of the columns in the spreadsheet. */
const OBJECTIVE_FINDINGS_ORDER = [
  'left',
  'right',
  'both',
  'sublux',
  'muscleSpasm',
  'triggerPoints',
  'tenderness',
  'numbness',
  'edema',
  'swelling',
  'reducedMotion',
];

const TREATMENT_ORDER = [
  'physioPositioning',
  'coldPack',
  'hotPack',
  'electStim',
  'traction',
  'massage',
  'positioning',
  'technique',
  'manipulation',
];

const pathMap = {
  // sides
  left: 'sides.l',
  right: 'sides.r',
  both: 'sides.b',
  // objective findings
  sublux: 'of.sublux',
  muscleSpasm: 'of.muscleSpasm',
  triggerPoints: 'of.triggerPoints',
  tenderness: 'of.tenderness',
  numbness: 'of.numbness',
  edema: 'of.edema',
  swelling: 'of.swelling',
  reducedMotion: 'of.reducedMotion',
  // treatment
  physioPositioning: 'physioPositioning',
  coldPack: 'coldPack',
  hotPack: 'hotPack',
  electStim: 'electStim',
  traction: 'traction',
  massage: 'massage',
  positioning: 'treatmentPositioning',
  technique: 'treatmentTechnique',
  manipulation: 'treatmentManipulation',
};

export async function createFormattedNoteExcel(
  noteID: string
): Promise<string> {
  // exceljs is fun - https://github.com/mui/mui-x/issues/5035
  // basically the constructor is defined incorrectly for Workbook, and needs to be called as default.Workbook().
  // but, good ol' typescript doesn't let me do that since default isn't part of the type Workbook. so hacky workaround lol.
  const exceljs = ExcelJS as any;

  try {
    // Load the existing Excel template
    const templatePath = 'static/spreadsheet_template/note_export.xlsx';
    const workbook = new exceljs.default.Workbook();
    await workbook.xlsx.readFile(templatePath);

    // Access the desired worksheet
    const worksheet = workbook.getWorksheet('Sheet1');
    if (!worksheet) {
      return '';
    }

    // load the note data
    const noteData = (await getNoteById(noteID)) as any;
    // console.log(noteData);
    const entriesData = await getEntriesData(noteData.id);
    // console.log('payload:', payload);
    if (!entriesData) {
      console.error('Failed to load note entries during excel export.');
      return '';
    }
    const treatmentData = await getTreatmentData(noteID);

    worksheet.getCell('A1').value = 'Ben was here!';

    // populate the note data into the excel file
    populateLevelData(entriesData, treatmentData, worksheet);

    // populate the extremities data
    populateExtremitiesData(entriesData, treatmentData, worksheet);

    // Save the modified Excel file
    const outputPath = `static/generated/${noteData.id}.xlsx`;
    // create the 'generated' folder if it doesn't exist yet
    if (!fs.existsSync('static/generated')) {
      fs.mkdirSync('static/generated', { recursive: true });
    }
    await workbook.xlsx.writeFile(outputPath);
    console.log(`note excel created at ${outputPath}`);

    return outputPath;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error modifying Excel file:', error);
    throw new Error('Failed to modify Excel file.');
  }
}

/**
 * populate date for spinal levels in the worksheet
 * @param entriesData data for entries
 * @param treatmentData data for treatments
 * @param worksheet exceljs worksheet object to modify
 */
function populateLevelData(
  entriesData: any,
  treatmentData: any,
  worksheet: ExcelJS.Worksheet
) {
  // go through each level and populate the findings
  for (const level in LEVELS) {
    const levels = LEVELS[level as keyof typeof LEVELS];
    process.stdout.write(
      `populating ${level} levels (${levels.length} in total)`
    );
    const rowStart = ROW_RANGES[level as keyof typeof ROW_RANGES][0];
    for (let levelNum = 0; levelNum < levels.length; levelNum++) {
      let levelObj = getLevelObj(entriesData, level, levelNum);
      if (!levelObj) {
        continue;
      }
      process.stdout.write(`level: ${level}${levelNum}`);
      const rowNumber = rowStart + levelNum;

      // get each objective finding
      process.stdout.write('adding objective findings ...');
      let colStart = COL_RANGES.OF[0];

      if (!colStart || !rowStart) {
        console.error('failed to find row and column range.');
        continue;
      }

      fillOutTableRow(
        colStart,
        rowNumber,
        levelObj,
        OBJECTIVE_FINDINGS_ORDER,
        worksheet
      );

      // get each treatment
      levelObj = getLevelObj(treatmentData, level, levelNum);
      colStart = COL_RANGES.PHYS[0];
      process.stdout.write(
        `adding treatments (${TREATMENT_ORDER.length} in total)`
      );

      fillOutTableRow(
        colStart,
        rowNumber,
        levelObj,
        TREATMENT_ORDER,
        worksheet
      );
    }
  }
}

/**
 * populates data in the worksheet for extremities
 * @param entriesData data for entries
 * @param treatmentData data for treatments
 * @param worksheet exceljs worksheet object to modify
 */
function populateExtremitiesData(
  entriesData: any,
  treatmentData: any,
  worksheet: ExcelJS.Worksheet
) {
  for (let extNum = 0; extNum < EXTREMITIES.length; extNum++) {
    let extremityObj = getExtremityObj(entriesData, EXTREMITIES[extNum]);
    if (!extremityObj) {
      continue;
    }

    // add findings data
    process.stdout.write('adding findings ...');
    let colStart = COL_RANGES.OF[0];
    const rowStart = ROW_RANGES.EXT[0];

    if (!colStart || !rowStart) {
      console.error('failed to find row and column range.');
      continue;
    }

    const rowNumber = rowStart + extNum;

    fillOutTableRow(
      colStart,
      rowNumber,
      extremityObj,
      OBJECTIVE_FINDINGS_ORDER,
      worksheet
    );

    // add treatment data
    colStart = COL_RANGES.PHYS[0];
    extremityObj = getExtremityObj(treatmentData, EXTREMITIES[extNum]);

    fillOutTableRow(
      colStart,
      rowNumber,
      extremityObj,
      TREATMENT_ORDER,
      worksheet
    );
  }
}

/**
 * Fills out a row of data for a table in the excel spreadsheet
 * @param colStart column number to start at (an offset)
 * @param rowNumber row number to insert data into
 * @param dataObj object containing the data for entries or treatments
 * @param dataOrderArray a list of the keys of values we want to put in this row; represents the true order of output in the spreadsheet
 * @param worksheet the exceljs.worksheet object we are adding data to.
 */
function fillOutTableRow(
  colStart: number,
  rowNumber: number,
  dataObj: any,
  dataOrderArray: string[],
  worksheet: ExcelJS.Worksheet
) {
  for (let col = 0; col < dataOrderArray.length; col++) {
    const curCol = colStart + col;
    const treatment = dataOrderArray[col];
    const val = getFinding(dataObj, treatment);
    if (!val) {
      continue;
    }
    if (!rowNumber) {
      console.error('no row number found!');
      continue;
    }
    const cellName = COL_LETTERS[curCol] + rowNumber;
    try {
      process.stdout.write(`writing value ${val} to cell ${cellName}`);
      worksheet.getCell(cellName).value = val === true ? 'x' : val;
    } catch {
      console.error(`Failed to write to cell ${cellName}`);
    }
  }
}

/**
 * gets the specified level from the payload
 * @param payload payload object to extract from
 * @param letter letter of the level
 * @param level number of the level (occ = 0)
 * @returns the object found at this level of the payload, or null if nonexistent
 */
function getLevelObj(payload: any, letter: string, level: number): any | null {
  const levelList = LEVELS[letter as keyof typeof LEVELS];
  if (!levelList) {
    console.log(`level ${letter}${level} not found!`);
    return null;
  }
  const propStr = levelList[level];
  const levelObj = payload[propStr];
  return levelObj;
}

function getExtremityObj(payload: any, extremity: string): any | null {
  return payload[extremity];
}

/**
 * gets a specific finding from a level or extremity object
 * @param levelObj level object from payload
 * @param finding key of the finding we want to get
 * @returns finding if it exists, or null if unable to be found
 */
function getFinding(groupObj: any, finding: string): any | null {
  if (!groupObj) {
    console.warn('passed non-existent object into getFinding');
  }
  const path = pathMap[finding as keyof typeof pathMap];
  if (!path) {
    console.error("path doesn't exist in path map!");
    return null;
  }
  return getValueAtPath(groupObj, path);
}

function getValueAtPath(obj: any, path: string): any | null {
  if (!obj) {
    console.error('tried to get value from null object');
    return null;
  }
  const propList = path.split('.');
  let curVal = obj;
  for (const prop of propList) {
    curVal = curVal[prop];
    if (!curVal) {
      return null;
    }
  }
  return curVal;
}

async function getEntriesData(noteID: string): Promise<any> {
  process.stdout.write('loading entries');
  const entries = (await getAllEntriesByNoteId(noteID)) as any[];
  console.log('number of entries:', entries.length);

  // get the data we want from entries into the format we use for exporting
  process.stdout.write('reducing payload data');
  const entriesPayload = entries.reduce((acc, entry) => {
    let key = entry.spinalLevel || entry.extremityLevel;
    key = key.split('_')[0];
    if (!acc[key]) {
      acc[key] = {
        sides: {},
        of: {},
        physio: {},
        treatment: {},
      };
    }

    if (entry.coldPack || entry.hotPack || entry.electStim) {
      console.log('found a treatment!');
    }

    acc[key].sides[entry.side] = true;
    acc[key].of.sublux = entry.sublux;
    acc[key].of.muscleSpasm = entry.muscleSpasm;
    acc[key].of.triggerPoints = entry.triggerPoints;
    acc[key].of.tenderness = entry.tenderness;
    acc[key].of.numbness = entry.numbness;
    acc[key].of.edema = entry.edema;
    acc[key].of.swelling = entry.swelling;
    acc[key].of.reducedMotion = entry.reducedMotion;
    acc[key].physio.positioning = entry.physioPositioning;
    acc[key].physio.coldPack = entry.coldPack;
    acc[key].physio.hotPack = entry.hotPack;
    acc[key].physio.electStim = entry.electStim;
    acc[key].physio.traction = entry.traction;
    acc[key].physio.massage = entry.massage;
    acc[key].treatment.positioning = entry.treatmentPositioning;
    acc[key].treatment.technique = entry.technique;
    acc[key].treatment.manipulation = entry.manipulation;

    return acc;
  }, {});

  return entriesPayload;
}

async function getTreatmentData(noteID: string): Promise<any> {
  const treatments = (await getAllTreatmentsByNoteId(noteID)) as Treatment[];
  console.log('treatments:', treatments);

  const treatmentsPayload: any = {};

  for (const treatment of treatments) {
    let key = treatment.spinalLevel || treatment.extremityLevel;
    key = key.split('_')[0];

    treatmentsPayload[key] = { ...treatment };
  }

  console.log('treatment payload:', treatmentsPayload);

  return treatmentsPayload;
}
