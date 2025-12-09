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

/*
id        String   @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  name      String
  norm      Int?
  dateAdded DateTime @default(now()) @db.Timestamp(6)
  arom      String?
  pain      String?
  notes     String?
  reportId  String   @db.Uuid
  report    report   @relation(fields: [reportId], references: [id])
*/

// excel export types

export type DataMappings = Record<string, any>;

export interface ExportExcelRequest {
  dataMappings: DataMappings;
  noteID: string;
  templateName: string;
}
