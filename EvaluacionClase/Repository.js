var scriptProp = PropertiesService.getScriptProperties();

function loadDataEvaluacion() {
  const ss = SpreadsheetApp.openById(scriptProp.getProperty('key'));
  let data = ss.getRangeByName('EvalClase').getValues();
  data = data.map(el => el.filter(ex => ex != ''));
  return data;
}

function loadData(nameData) {
  const ss = SpreadsheetApp.openById(scriptProp.getProperty('key'));
  const data = ss.getRangeByName(nameData).getValues();
  return data;
}

function loadDataUnidades() {
  return loadData('Clases');
}

function loadDataAvent(numCol = 1) {
  const ss = SpreadsheetApp.openById(scriptProp.getProperty('key')).getSheetByName("DATOS");
  let coldata = ss.getRange(2, numCol, ss.getLastRow(), 1).getDisplayValues();
  return coldata.filter(el => el != '')
}

function getIndexUnidad(nameUnid) {
  const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
  const sheet = doc.getSheetByName("DATOS");
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  return headers.indexOf(nameUnid);
}

function saveMainData(formData) {
  if (formData.nota) {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    const sheet = doc.getSheetByName(formData.clase);
    sheet.appendRow([
      formData.fecha,
      'NOTA: ' + formData.nota
    ]);
  }
}

function saveAttendanceData(formData) {
  const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
  const sheet = doc.getSheetByName(formData.clase);
  Logger.log(formData);
  sheet.appendRow([
    formData.fecha,
    formData.evalPerson,
    formData.evalAsistencia,
    formData.evalMateriales,
    formData.evalDisciplina,
    formData.evalResponsabilidad,
    formData.evalParticipacion,
    new Date()
  ]);
}


