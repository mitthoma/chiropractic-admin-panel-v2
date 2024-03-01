

// Note types
export interface Treatment {
  id: string;
  category: string;
  region: string;
  spinalLevel: string;
  extremityLevel: string;
  side: string;
  physioPositioning: string;
  treatmentPositioning: string;
  treatmentTechnique: string;
  coldPack: boolean;
  hotPack: boolean;
  electStim: boolean;
  traction: boolean;
  massage: boolean;
  treatmentManipulation: boolean;
  noteId: string;
}

// Report types

export interface Posture {
  id: string
  name: string
  wnl: string
  dateAdded: DateTime
  tiltName: string
  tiltEst: string
  translationName: string
  translationEst: string
  pronated: string
  supinated: string
  rotation: string
  lordKyph: string
  reportId: string
  report: report
}

// excel export types

export type DataMappings = Record<string, any>;

export interface ExportExcelRequest {
    dataMappings: DataMappings,
    noteID: string,
    templateName: string
}