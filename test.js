const datos = [
    ['16/04/2023','Frutas', 6, 5, 3],
    ['16/04/2023','Caramelo', 10, 10, 4],
    ['16/04/2023','Frutas', 1, 8, 9, 8, 10, 5],
    ['16/04/2023','Cajones', 4, 8, 9, -1],
    ['16/04/2023','Verduras', 9, 3, 9],
    ['16/04/2023','Verduras', 7, 6, 9],
    ['16/04/2023','Caramelo', 1, 5, 9],
    ['16/04/2023','Verduras', 6, 9, 0],
    ['16/04/2023','Cajones', 6, 9, 0],
    ['16/04/2023','Juan',],
];

const totales = datos.reduce((resultado, fila) => {
    const categoria = fila[1];
    const valores = fila.slice(2);
    resultado[categoria] = (resultado[categoria] || []).concat(valores);
    return resultado;
}, {});
const resultadoMatriz = Object.entries(totales).map(([categoria, valores]) => [categoria, ...valores]);

console.log(resultadoMatriz);

const totalesAgrupados = Object.entries(totales).reduce((resultado, [categoria, valores]) => {
    console.log(valores)
    const total = valores.reduce((acumulador, valor) => acumulador + valor, 0);
    resultado[categoria] = total;
    return resultado;
}, {});

console.log(totalesAgrupados);

const matriz = Object.entries(totalesAgrupados).sort((a, b) => b[1] - a[1]);

const objetoOrdenado = JSON.stringify(matriz);

const parse = JSON.parse(objetoOrdenado);

for (const valor of parse) {
    console.log(valor[0] +"- "+ valor[1] );    
}



