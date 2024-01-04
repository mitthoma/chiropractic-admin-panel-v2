export function formatDate(date) {
  if (isNaN(Date.parse(date))) {
    return 'Invalid date';
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));

  return `${formattedDate}`;
}

export const sides = [
  {
    title: 'Left',
    value: 'l',
  },
  {
    title: 'Right',
    value: 'r',
  },
  {
    title: 'Both',
    value: 'b',
  },
];

export const extremityLevels = [
  {
    title: 'Arm',
    value: 'arm',
  },
  {
    title: 'Bicep',
    value: 'bicep',
  },
  {
    title: 'Tricep',
    value: 'tricep',
  },
  {
    title: 'Elbow',
    value: 'elbow',
  },
  {
    title: 'Wrist',
    value: 'wrist',
  },
  {
    title: 'Hand',
    value: 'hand',
  },
  {
    title: 'Hip',
    value: 'hip',
  },
  {
    title: 'Thigh',
    value: 'thigh',
  },
  {
    title: 'Leg',
    value: 'leg',
  },
  {
    title: 'Knee',
    value: 'knee',
  },
  {
    title: 'Calf',
    value: 'calf',
  },
  {
    title: 'Ankle',
    value: 'ankle',
  },
  {
    title: 'Foot',
    value: 'foot',
  },
];

export const spinalLevels = [
  // {
  //     title: 'OCC',
  //     value: 'occ'
  // },
  {
    title: 'OCC - C1',
    value: 'c1',
  },
  {
    title: 'C1 - C2',
    value: 'c2',
  },
  {
    title: 'C2 - C3',
    value: 'c3',
  },
  {
    title: 'C3 - C4',
    value: 'c4',
  },
  {
    title: 'C4 - C5',
    value: 'c5',
  },
  {
    title: 'C5 - C6',
    value: 'c6',
  },
  {
    title: 'C6 - C7',
    value: 'c7',
  },
  // {
  //     title: 'T1',
  //     value: 't1'
  // },
  {
    title: 'T1 - T2',
    value: 't2',
  },
  {
    title: 'T2 - T3',
    value: 't3',
  },
  {
    title: 'T3 - T4',
    value: 't4',
  },
  {
    title: 'T4 - T5',
    value: 't5',
  },
  {
    title: 'T5 - T6',
    value: 't6',
  },
  {
    title: 'T6 - T7',
    value: 't7',
  },
  {
    title: 'T7 - T8',
    value: 't8',
  },
  {
    title: 'T8 - T9',
    value: 't9',
  },
  {
    title: 'T9 - T10',
    value: 't10',
  },
  {
    title: 'T10 - T11',
    value: 't11',
  },
  {
    title: 'T11 - T12',
    value: 't12',
  },
  // {
  //     title: 'L1',
  //     value: 'l1'
  // },
  {
    title: 'L1 - L2',
    value: 'l2',
  },
  {
    title: 'L2 - L3',
    value: 'l3',
  },
  {
    title: 'L3 - L4',
    value: 'l4',
  },
  {
    title: 'L4 - L5',
    value: 'l5',
  },
  // {
  //     title: 'S1',
  //     value: 's1'
  // },
  {
    title: 'S1 - S2',
    value: 's2',
  },
  {
    title: 'S2 - S3',
    value: 's3',
  },
  {
    title: 'S3 - S4',
    value: 's4',
  },
  {
    title: 'S4 - S5',
    value: 's5',
  },
];

export const spinalRegions = [
  {
    title: 'Sub Occ',
    value: 'sub-occ',
  },
  {
    title: 'Upper Cerv',
    value: 'upper-cerv',
  },
  {
    title: 'Mid Cerv',
    value: 'mid-cerv',
  },
  {
    title: 'Lower Cerv',
    value: 'lower-cerv',
  },
  {
    title: 'Upper T',
    value: 'upper-t',
  },
  {
    title: 'Mid T',
    value: 'mid-t',
  },
  {
    title: 'Lower T',
    value: 'lower-t',
  },
  {
    title: 'Upper L',
    value: 'upper-l',
  },
  {
    title: 'Lower L',
    value: 'lower-l',
  },
  {
    title: 'Upper Sac',
    value: 'upper-sac',
  },
  {
    title: 'Lower Sac',
    value: 'lower-sac',
  },
];
