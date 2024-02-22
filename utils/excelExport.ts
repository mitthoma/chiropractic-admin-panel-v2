import * as fs from 'fs';
import * as ExcelJS from 'exceljs';
import { getNoteById } from '~~/server/repositories/noteRepository';
import { getAllEntriesByNoteId } from '~~/server/repositories/entryRepository';

// eslint-disable-next-line prettier/prettier
const COL_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

/**
 * Ranges of columns for each finding type. Note: this is 0-based, since we use it to find the corresponding letter from the COLS array.
 */
const COL_RANGES = {
  OF: [3, 13],
  PHYS: [15, 23],
  TREAT: [3, 14],
};

/**
 * Ranges of rows for each level. NOTE: this is 1-based, not 0-based!
 * This is because we want the actual row number shown in the spreadsheet.
 */
const ROW_RANGES = {
  C: [17, 24],
  T: [0, 0],
  L: [0, 0],
  S: [0, 0],
  TREAT: [0, 0],
};

const LEVELS = {
  C: ['occ', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'],
  // eslint-disable-next-line prettier/prettier
  T: ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10', 't11', 't12'],
  L: ['l1', 'l2', 'l3', 'l4', 'l5'],
  S: ['s1', 's2', 's3', 's4', 's5'],
};

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

const pathMap = {
  left: 'sides.l',
  right: 'sides.r',
  both: 'sides.b',
  sublux: 'of.sublux',
  muscleSpasm: 'of.muscleSpasm',
  triggerPoints: 'of.triggerPoints',
  tenderness: 'of.tenderness',
  numbness: 'of.numbness',
  edema: 'of.edema',
  swelling: 'of.swelling',
  reducedMotion: 'of.reducedMotion',
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
    let worksheet = workbook.getWorksheet('Sheet1');
    if (!worksheet) {
      return '';
    }

    // load the note data
    const noteData = (await getNoteById(noteID)) as any;
    // console.log(noteData);
    const payload = await getPayload(noteData.id);
    // console.log('payload:', payload);
    if (!payload) {
      console.error('Failed to load note entries during excel export.');
      return '';
    }

    worksheet.getCell('A1').value = 'Ben was here!';

    // populate the note data into the excel file
    worksheet = populateLevelFindings(payload, worksheet);

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

function populateLevelFindings(
  payload: any,
  worksheet: ExcelJS.Worksheet
): ExcelJS.Worksheet {
  // go through each level and populate the findings
  for (const level in LEVELS) {
    const levels = LEVELS[level as keyof typeof LEVELS];
    for (let levelNum = 0; levelNum < levels.length; levelNum++) {
      const levelObj = getLevelObj(payload, level, levelNum);
      if (!levelObj) {
        console.warn(
          `failed to get level object (${level}${levelNum}) during export. export data may be incomplete.`
        );
        break;
      }

      // get each finding for this level
      console.log('adding findings...');
      for (let col = 0; col < OBJECTIVE_FINDINGS_ORDER.length; col++) {
        const curCol = COL_RANGES.OF[0] + col;
        const finding = OBJECTIVE_FINDINGS_ORDER[col];
        const val = getLevelFinding(levelObj, finding);
        if (!val) {
          continue;
        }
        const rowNumber =
          ROW_RANGES[level as keyof typeof ROW_RANGES][levelNum];
        const cellName = COL_LETTERS[curCol] + rowNumber;
        console.log(`writing value ${val} to cell ${cellName}`);
        worksheet.getCell(cellName).value = 'x';
      }
    }
  }
  return worksheet;
}

/**
 * gets the specified level from the payload
 * @param payload payload object to extract from
 * @param letter letter of the level
 * @param level number of the level (occ = 0)
 * @returns the object found at this level of the payload, or null if nonexistent
 */
function getLevelObj(payload: any, letter: string, level: number): any | null {
  console.log('getting level object');
  console.log('level', letter, 'number', level);
  const levelList = LEVELS[letter as keyof typeof LEVELS];
  if (!levelList) {
    console.log(`level ${letter}${level} not found!`);
    return null;
  }
  const propStr = levelList[level];
  return payload[propStr];
}

/**
 * gets a level-specific finding
 * @param levelObj level object from payload
 * @param finding key of the finding we want to get
 * @returns finding if it exists, or null if unable to be found
 */
function getLevelFinding(levelObj: any, finding: string): any | null {
  const path = pathMap[finding as keyof typeof pathMap];
  if (!path) {
    console.warn("path doesn't exist in path map!");
    return null;
  }
  return getValueAtPath(levelObj, path);
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

async function getPayload(noteID: string): Promise<any> {
  const entries = (await getAllEntriesByNoteId(noteID)) as any[];

  // get the data we want from entries into the format we use for exporting
  const payload = entries.reduce((acc, entry) => {
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

  return payload;
}

/*

const entries = await this.entryService.getEntriesForNote({
        noteId: note.id,
      });

      // 2. construct the payload
      const payload = entries.reduce((acc, entry) => {
        const key = entry.spinalLevel || entry.extremityLevel;
        if (!acc[key]) {
          acc[key] = {
            sides: {},
            of: {},
            physio: {},
            treatment: {},
          };
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
      payload.phaseOneRoomAssignments = {
        physio: '',
        tx: '',
      };
      const currentPatient = await this.getCurrentPatient();

      payload.patientFirstName = currentPatient.firstName;
      payload.patientLastName = currentPatient.lastName;
      payload.noteVisitDate = note.visitDate || note.visitDateText || '';
      payload.height =
        `${currentPatient.heightFeet || ''}'${
          currentPatient.heightInches || ''
        }"` || '';
      payload.weight = `${currentPatient.weight || ''} lbs`;
      payload.temperature = `${note.temperature} F` || '';
      payload.systolic = note.systolic || '';
      payload.diastoic = note.diastoic || '';
      payload.pulse = note.pulse || '';
      payload.respiration = note.respiration || '';
      payload.physiotherapyNumber = note.physiotherapy || '';

*/
