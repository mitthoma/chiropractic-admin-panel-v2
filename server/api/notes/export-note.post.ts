/* eslint-disable no-console */
import * as fs from 'fs';
import { createFormattedNoteExcel } from '~~/server/repositories/excelExport/exportNote';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const noteID = body.noteId;
    if (!noteID) {
      console.error('Export note: Note ID not found in request body');
      return {
        success: false,
        statusCode: 400,
      };
    }
    const exportXlsxPath = await createFormattedNoteExcel(noteID);
    const fileContent = await fs.promises.readFile(exportXlsxPath);

    // delete the generated file so we don't clutter things
    fs.unlink(exportXlsxPath, (err) => {
      if (err) {
        console.error('error deleting generated excel after use:', err);
      }
    });

    const headers = {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename=${noteID}.xlsx`,
    };
    return {
      success: true,
      statusCode: 200,
      headers,
      body: fileContent.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Error exporting note:', error);

    return {
      success: false,
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
});
