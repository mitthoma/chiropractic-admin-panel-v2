// Function to convert base64 to Blob
export function base64toBlob(base64Data: string, contentType: string): Blob {
  const byteCharacters = atob(base64Data);
  // const byteCharacters = Buffer.from(base64Data, 'base64');
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

export function makeFilenameExcelNote(
  dateStr: string,
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
  return `${patientFirstName}_${patientLastName}_note${dateStr}.xlsx`;
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
