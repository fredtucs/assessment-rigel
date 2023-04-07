let scriptProp = PropertiesService.getScriptProperties();

function loadDataEvaluacion() {
  const ss = SpreadsheetApp.openById(scriptProp.getProperty('key'));
  const data = ss.getRangeByName('EvalClase').getValues();
  const result = data.map(arr => {
    const [title, ...items] = arr.filter(Boolean);
    const [criteItems, valueItems] = items.reduce(([criteAcc, valueAcc], item) => {
      isNaN(item) ? criteAcc.push(item) : valueAcc.push(item);
      return [criteAcc, valueAcc];
    }, [[], []]);
    return [title, criteItems, valueItems];
  });
  return result;
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
  const horValid = this.horarioClases();
  const ss = SpreadsheetApp.openById(scriptProp.getProperty('key')).getSheetByName("DATOS");
  let coldata = ss.getRange(2, numCol, ss.getLastRow(), 1).getDisplayValues();
  coldata = coldata.filter(el => el != '')
  coldata.map((elem, index) => { elem.push(horValid); return elem; })  
  return coldata;  
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
  const justInasistencia = formData.justInasistencia ? formData.justInasistencia : '';
  const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
  const sheet = doc.getSheetByName(formData.clase);
  const now = new Date();  
  sheet.appendRow([
    formData.fecha,
    formData.evalPerson,
    formData.evalAsistencia,
    formData.evalMateriales,
    formData.evalDisciplina,
    formData.evalResponsabilidad,
    formData.evalParticipacion,
    justInasistencia,
    now
  ]);
}

function horarioClases() {
  let today = new Date();
  let weekday = today.getDay();
  let hourOpen = new Date();
  hourOpen.setHours(10, 0, 0);
  let hourClose = new Date();
  hourClose.setHours(11, 0, 0);
  return true//(weekday == 0) && (today >= hourOpen && today < hourClose);
}
