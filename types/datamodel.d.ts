
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