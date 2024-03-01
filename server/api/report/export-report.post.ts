import { getReportDataMappings } from '~~/server/repositories/excelExport/exportReport';

export default defineEventHandler(async (event) => {
  try {
    console.log('export report api called');
    const body = await readBody(event);
    const reportID = body.reportID;
    if (!reportID) {
      console.error('Export report: Report ID not found in request body');
      return {
        success: false,
        statusCode: 400,
      };
    }

    // get the data mappings we want to send to the excel export service
    const excelDataMappings = await getReportDataMappings(reportID);
    if (!excelDataMappings) {
      console.error('Failed to load data mappings');
      return {
        success: false,
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      };
    }

    return {
      success: true,
      statusCode: 200,
      body: excelDataMappings,
    };
  } catch (error) {
    console.error('Error exporting report:', error);

    return {
      success: false,
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
});
