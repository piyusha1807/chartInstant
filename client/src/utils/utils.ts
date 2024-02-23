export function convertArrayToObject(array: any = []) {
  const result: any = {};
  const dataTypes: any = {};

  if (array.length <= 0) return result;

  for (let i = 0; i < array[0].length; i++) {
    const key = array[0][i];
    result[key] = [];
    dataTypes[key] = [];
  }

  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      const key = array[0][j];
      result[key].push(array[i][j]);
      if (i === 1) {
        dataTypes[key] = typeof array[i][j] === 'string' ? 'string' : 'number';
      }
    }
  }

  return { result, dataTypes };
}

export function generateRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  
  const color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
  
  return color;
}

export function generateRandomChartColor(index: number) {
  const colors = ['#1d9bfb', '#25fdfc', '#148ab0', '#148ab0', '#8ee4ff'];

  if (index < 5) return colors[index];

  return generateRandomColor();
}
