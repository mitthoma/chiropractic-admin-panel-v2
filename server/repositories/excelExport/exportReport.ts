/* eslint-disable prettier/prettier */
 
import {
  cervical,
  lumbar,
  myoDerm,
  orthoProne,
  orthoSeated,
  orthoStanding,
  orthoSupine,
  posture,
  reflexes,
  report,
} from '@prisma/client';
import { getAllLumbarsByReportId } from '../reports/lumbarRepository';
import { getAllPosturesByReportId } from '../reports/postureRepository';

import { getAllReflexessByReportId } from '../reports/reflexesRepository';
import { getAllOrthoStandingsByReportId } from '../reports/orthoStandingRepository';
import { getAllOrthoSeatedsByReportId } from '../reports/orthoSeatedRepository';
import { getAllOrthoSupinesByReportId } from '../reports/orthoSupineRepository';
import { getAllOrthoPronesByReportId } from '../reports/orthoProneRepository';
import { getAllCervicalsByReportId } from '../reports/cervicalRepository';
import { getAllMyoDermsByReportId } from '../reports/myoDermRepository';

import { getPatient } from '../patientRepository';
import { getReportById } from '../reports/reportRepository';
import { DataMappings } from '~~/types/datamodel';

interface ReportGeneralData {
  height: string;
  weight: number;
  temp: number;
  sys: number;
  dia: number;
  pulse: number;
  resp: number;
  patientName: string;
  examDate: string;
  acctNo: string;
}

// define the patterns for mapping different values
 
const COL_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
 
const postureOrder = ['name', 'wnl', 'tiltName', 'tiltEst', 'translationName', 'translationEst', 'rotation', 'lordKyph'];
const postureOrder2 = ['name', 'pronated', 'supinated'];
const postureColStart = 0;
const postureRowStart = 16;
const postureRowStart2 = 21;

// lumbar
const lumbarOrder = ['name', 'norm', 'arom', 'pain', 'notes'];
const lumbarColStart = 0;
const lumbarRowStart = 26;

// reflexes
const reflexesOrder = ['name', 'wnl', 'lt', 'rt', 'notes'];
const reflexesColStart = 6;
const reflexesRowStart = 26;

// ortho standing
const orthoStandingOrder = ['name', 'wnl', 'lt', 'rt', 'pain']
const orthoStandingColStart = 0;
const orthoStandingRowStart = 36;

// ortho seated
const orthoSeatedOrder = ['name', 'wnl', 'lt', 'rt', 'referral']
const orthoSeatedColStart = 6;
const orthoSeatedRowStart = 36;

// cervical
const cervicalOrder = ['name', 'norm', 'arom', 'pain', 'notes']
const cervicalColStart = 0;
const cervicalRowStart = 48;

// orthoSupine
const orthoSupineOrder = ['name', 'wnl', 'lt', 'rt', 'referral']
const orthoSupineColStart = 6;
const orthoSupineRowStart = 48;

// myoderm
const myodermOrder = ['name', 'wnl', 'lt', 'rt', 'notes'];
const myodermColStart = 0;
const myodermRowStart = 58;

// orthoProne
const orthoProneOrder = ['name', 'wnl', 'lt', 'rt', 'referral'];
const orthoProneColStart = 6;
const orthoProneRowStart = 58;

const generalDataMappings = {
  patientName: "B4",
  acctNo: "B5",
  examDate: "B6",
  height: "B8",
  weight: "B9",
  temp: "B10",
  sys: "D8",
  dia: "D9",
  pulse: "F8",
  resp: "F9"
};

export async function getReportDataMappings(
  reportID: string
): Promise<DataMappings | null> {
  // load all the data we need to export
  const reportData = await loadReportData(reportID);
  if (!reportData) {
    return null;
  }
  const reportGeneral = await loadReportGeneralData(reportID);
  if (!reportGeneral) {
    return null;
  }

  // put all the data into a DataMappings object
  const dataMappings: DataMappings = {};
  populateGeneralData(dataMappings, reportGeneral);

  // fill out postures - needs special handling since the data is organized oddly
  const posturesData1 = reportData.postures.slice(0, 3);
  const posturesData2 = [reportData.postures[3]];
  populateTable(dataMappings, postureOrder, postureColStart, postureRowStart, posturesData1);
  populateTable(dataMappings, postureOrder2, postureColStart, postureRowStart2, posturesData2);

  // fill out the rest of the tables
  populateTable(dataMappings, lumbarOrder, lumbarColStart, lumbarRowStart, reportData.lumbar);
  populateTable(dataMappings, reflexesOrder, reflexesColStart, reflexesRowStart, reportData.reflexes);
  populateTable(dataMappings, orthoStandingOrder, orthoStandingColStart, orthoStandingRowStart, reportData.orthoStanding);
  populateTable(dataMappings, orthoSeatedOrder, orthoSeatedColStart, orthoSeatedRowStart, reportData.orthoSeated);
  populateTable(dataMappings, cervicalOrder, cervicalColStart, cervicalRowStart, reportData.cervical);
  populateTable(dataMappings, orthoSupineOrder, orthoSupineColStart, orthoSupineRowStart, reportData.orthoSupine);
  populateTable(dataMappings, myodermOrder, myodermColStart, myodermRowStart, reportData.myoDerm);
  populateTable(dataMappings, orthoProneOrder, orthoProneColStart, orthoProneRowStart, reportData.orthoProne);

  return dataMappings;
}

function populateTable(dataMappings: DataMappings, propOrder: string[], colStart: number, rowStart: number, dataObject: any) {
  let curRow = rowStart;
    for (const rowData of dataObject) {
        let curCol = colStart;
        for (const dataProp of propOrder) {
            const cellName = COL_LETTERS[curCol] + curRow;
            dataMappings[cellName] = rowData[dataProp];
            curCol++;
        }
        curRow++;
    }
}

function populateGeneralData(dataMappings: DataMappings, generalData: ReportGeneralData) {
  for (const prop in generalDataMappings) {
    const cellName = (generalDataMappings as any)[prop]; // ah, typescript...
    dataMappings[cellName] = (generalData as any)[prop];
  }
}

interface ReportData {
  postures: posture[];
  lumbar: lumbar[];
  reflexes: reflexes[];
  orthoStanding?: orthoStanding[];
  orthoSeated?: orthoSeated[];
  orthoSupine?: orthoSupine[];
  orthoProne?: orthoProne[];
  cervical?: cervical[];
  myoDerm?: myoDerm[];
}

async function loadReportData(reportID: string): Promise<ReportData> {
  const postures = (await getAllPosturesByReportId(reportID)) as posture[];
  const lumbar = (await getAllLumbarsByReportId(reportID)) as lumbar[];
  const reflexes = (await getAllReflexessByReportId(reportID)) as reflexes[];
  const orthoStanding = (await getAllOrthoStandingsByReportId(reportID)) as orthoStanding[];
  const orthoSeated = (await getAllOrthoSeatedsByReportId(reportID)) as orthoSeated[];
  const orthoSupine = await getAllOrthoSupinesByReportId(reportID) as orthoSupine[];
  const orthoProne = await getAllOrthoPronesByReportId(reportID) as orthoProne[];
  const cervical = await getAllCervicalsByReportId(reportID) as cervical[];
  const myoDerm = await getAllMyoDermsByReportId(reportID) as myoDerm[];
  const data: ReportData = {
    postures,
    lumbar,
    reflexes,
    orthoStanding,
    orthoSeated,
    orthoSupine,
    orthoProne,
    cervical,
    myoDerm,
  };
  return data;
}



async function loadReportGeneralData(reportID: string): Promise<ReportGeneralData | null> {
  const reportData = await getReportById(reportID) as report;
  if (!reportData) {
    console.error('failed to load report data during report export.');
    return null;
  }
  const patient = await getPatient(reportData.patientId);
  if (!patient) {
    console.error('failed to load patient data during report export.');
    return null;
  }
  console.log('general report data:', reportData);
  const height = `${patient.heightFeet}'${patient.heightInches}`;
  const patientName = `${patient.lastName}, ${patient.firstName}`;
  
  let examDate = 'None';
  if (reportData.exam_date) {
    examDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(reportData.exam_date));
  }
  return {
    temp: reportData.temp || 0,
    sys: reportData.sys || 0,
    dia: reportData.dia || 0,
    pulse: reportData.pulse || 0,
    resp: reportData.resp || 0,
    patientName,
    height,
    weight: patient.weight || 0,
    examDate,
    acctNo: patient.acctNo
  }
}
