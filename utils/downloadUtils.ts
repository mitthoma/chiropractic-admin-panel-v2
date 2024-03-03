export function makeFilenameExcel(
  dateStr: string,
  typeOfData: string,
  patientFirstName: string,
  patientLastName: string
) {
  if (!patientFirstName) {
    patientFirstName = 'Patient';
  }
  if (!patientLastName) {
    patientLastName = 'McPatient';
  }
  if (dateStr === 'No Date Data') {
    dateStr = '';
  } else {
    // remove forward slashes so the date is just MMDDYYYY
    dateStr = '_' + dateStr.replace(/\//g, '');
  }
  return `${patientFirstName}_${patientLastName}_${typeOfData}${dateStr}.xlsx`;
}

/**
 * Initiates a download of the given file blob on the client
 * @param blob Blob file to download
 * @param outputFileName filename to give the downloaded file (including file extension)
 */
export function downloadFile(blob: Blob, outputFileName: string) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = outputFileName;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
