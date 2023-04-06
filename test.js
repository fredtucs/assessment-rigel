const data = [['Asistencia', 'Punt.', 'Tard.', 'Just.', 'Falt.', '2', '1', '0', '-1'],
['Uniforme', 'Si', 'No', '1', '0', '', ''],
['Higiene', 'Si', 'No', '1', '0'],
['Materiales', 'Si', 'No', '1', '0'],
['Disciplina', 'Si', 'No', '1', '0'],
['Responsabilidad', 'Si', 'No', '1', '0'],
['Participacion', 'Si', 'No', '1', '0']]

let result = data.map(arr => {
    const [title, ...items] = arr.filter(Boolean);
    const [criteItems, valueItems] = items.reduce(([criteAcc, valueAcc], item) => {
        isNaN(item) ? criteAcc.push(item) : valueAcc.push(item);
        return [criteAcc, valueAcc];
    }, [[], []]);
    return [title, criteItems, valueItems];
});
console.log(result); 