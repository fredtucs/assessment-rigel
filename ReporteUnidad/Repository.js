let scriptProp = PropertiesService.getScriptProperties();

function loadData(nameData, key) {
  const ss = SpreadsheetApp.openById(scriptProp.getProperty(key));
  const data = ss.getRangeByName(nameData).getValues();
  return data;
}

function loadDataUnidadClase(tipo) {
  if (tipo == 0) {
    return loadData('Unidades', 'keyUnidad');
  } else {
    return loadData('Clases', 'keyClase');
  }
}

function loadEvalUnidadClase(unidClas, tipo) {
  let data;
  if (tipo == 0) {
    data = loadDataEvalUnidad(unidClas);
  } else if (tipo == 1) {
    data = loadDataEvalClase(unidClas);
  } else {
    data = loadDataEvalTotal(unidClas);
  }
  return JSON.stringify(data);
}

function loadDataEvalUnidad(unidad = "Orcas") {
  const ss = SpreadsheetApp.openById(scriptProp.getProperty('keyUnidad')).getSheetByName(unidad);
  let coldata = ss.getRange(2, 1, ss.getLastRow(), 9).getDisplayValues();
  coldata = coldata.filter(fila => fila[0] != '' && fila[1].indexOf('NOTA') === -1);

  let totales = coldata.reduce((resultado, fila) => {
    const categoria = fila[1];
    const valores = fila.slice(2);
    resultado[categoria] = (resultado[categoria] || []).concat(valores);
    return resultado;
  }, {});

  let totalesAgrupados = Object.entries(totales).reduce((resultado, [categoria, valores]) => {
    const total = valores.reduce((acumulador, valor) => acumulador + parseInt(valor), 0);
    resultado[categoria] = total;
    return resultado;
  }, {});

  let matriz = Object.entries(totalesAgrupados).sort((a, b) => b[1] - a[1]);

  return matriz;
}

function loadDataEvalClase(clase = "Abejitas Laboriosas") {
  const ss = SpreadsheetApp.openById(scriptProp.getProperty('keyClase')).getSheetByName(clase);
  let coldata = ss.getRange(2, 1, ss.getLastRow(), 7).getDisplayValues();
  coldata = coldata.filter(fila => fila[0] != '' && fila[1].indexOf('NOTA') === -1);

  let totales = coldata.reduce((resultado, fila) => {
    const categoria = fila[1];
    const valores = fila.slice(2);
    resultado[categoria] = (resultado[categoria] || []).concat(valores);
    return resultado;
  }, {});

  let totalesAgrupados = Object.entries(totales).reduce((resultado, [categoria, valores]) => {
    const total = valores.reduce((acumulador, valor) => acumulador + parseInt(valor), 0);
    resultado[categoria] = total;
    return resultado;
  }, {});

  let matriz = Object.entries(totalesAgrupados).sort((a, b) => b[1] - a[1]);

  return matriz;
}

function loadDataEvalTotal(clase = "Abejitas Laboriosas") {

  const clxUnidad = loadData('ClasesUnidades', 'keyClase')
  let unidades = clxUnidad.filter(fila => fila[0] == clase).flat().filter(item => item !== clase);

  let evalDataResult = [];
  for (const unidad of unidades) {
    let dataEval = loadDataEvalUnidad(unidad);
    evalDataResult.push(dataEval);
  }
  
  let evalClase = loadDataEvalClase(clase);
  evalDataResult.push(evalClase);
  evalDataResult = evalDataResult.flat();

  let evalAcumulado = evalDataResult.reduce((resultado, fila) => {
    const categoria = fila[0];
    const valores = fila[1];
    resultado[categoria] = (resultado[categoria] || []).concat(valores);
    return resultado;
  }, {});

  let evalSumatoria = Object.entries(evalAcumulado).reduce((resultado, [categoria, valores]) => {
    const total = valores.reduce((acumulador, valor) => acumulador + parseInt(valor), 0);
    resultado[categoria] = total;
    return resultado;
  }, {});

  let evalResult = Object.entries(evalSumatoria).sort((a, b) => b[1] - a[1]);
  
  return evalResult;
}