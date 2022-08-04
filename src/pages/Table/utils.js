export const rowDataDeFormatter = (row) => {
    let attributes = Object.entries(row.attributes).map(([key, value]) => {
        return {name: key, value: value}
    })
    return { id: row.id, attributes: attributes }
}

export const rowsDataFormatter = (rows) => {
    let arrOfRows = [];
    rows.forEach(row => {
        let finalObj = {};
        row.attributes.forEach(attr => {
            const keyValue = Object.values({name: attr.name, value: attr.value});
            finalObj[keyValue[0]] = keyValue[1];
        })
        arrOfRows.push({ id: row.id, attributes: finalObj})
    })
    return arrOfRows;
}

export const flatData = (arr, key) => {
    const res = [];
  
    const recursion = (data) => {
      data.forEach((item) => {
        if (!item.hasOwnProperty(key)) {
          res.push(item);
        }
        if (item[key]) {
            recursion(item[key]);
        }
      });
    };
    recursion(arr);

    return res
  }