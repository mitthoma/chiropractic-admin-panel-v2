/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAllLumbarsByReportId } from '../reports/lumbarRepository';
import { getAllPosturesByReportId } from '../reports/postureRepository';

import { getAllReflexessByReportId } from '../reports/reflexesRepository';
import { getAllOrthoStandingsByReportId } from '../reports/orthoStandingRepository';
import { getAllOrthoSeatedsByReportId } from '../reports/orthoSeatedRepository';
import { getAllOrthoSupinesByReportId } from '../reports/orthoSupineRepository';
import { getAllOrthoPronesByReportId } from '../reports/orthoProneRepository';
import { getAllCervicalsByReportId } from '../reports/cervicalRepository';
import { getAllMyoDermsByReportId } from '../reports/myoDermRepository';

import { DataMappings, Posture } from '~~/types/datamodel';

// define the patterns for mapping different values
// eslint-disable-next-line prettier/prettier
const COL_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

// eslint-disable-next-line prettier/prettier
const postureOrder = ['wnl', 'tiltName', 'tiltEst', 'translationName', 'translationEst', 'rotation', 'lordKyph'];
const postureOrder2 = ['pronated', 'supinated'];
const postureColStart = 1;
const postureRowStart = 16;
const postureRowStart2 = 21;

// lumbar
const lumbarOrder = ['arom', 'pain', 'notes'];
const lumbarColStart = 2;
const lumbarRowStart = 26;

export async function getExamSummaryDataMappings(
  reportID: string
): Promise<DataMappings | null> {
  // load all the data we need to export
  console.log(`loading data for report ${reportID}`);
  const reportData = await loadReportData(reportID);

  // put all the data into a DataMappings object
  const dataMappings: DataMappings = {};
  populatePosture(dataMappings, reportData.postures);

  return dataMappings;
}

function populatePosture(dataMappings: DataMappings, postureData: Posture[]) {
  for (const posture of postureData) {
    console.log(posture.name);
  }
}

interface ReportData {
  postures: Posture[];
  lumbar: any;
  reflexes: any;
  orthoStanding?: any;
  orthoSeated?: any;
  orthoSupine?: any;
  orthoProne?: any;
  cervical?: any;
  myoDerm?: any;
}

async function loadReportData(reportID: string): Promise<ReportData> {
  const postures = (await getAllPosturesByReportId(reportID)) as Posture[];
  const lumbar = await getAllLumbarsByReportId(reportID);
  const reflexes = await getAllReflexessByReportId(reportID);
  const orthoStanding = await getAllOrthoStandingsByReportId(reportID);
  const orthoSeated = await getAllOrthoSeatedsByReportId(reportID);
  const orthoSupine = await getAllOrthoSupinesByReportId(reportID);
  const orthoProne = await getAllOrthoPronesByReportId(reportID);
  const cervical = await getAllCervicalsByReportId(reportID);
  const myoDerm = await getAllMyoDermsByReportId(reportID);
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
  console.log('report data:', data);
  return data;
}
