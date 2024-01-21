export function convertArrayToObject(array: any = []) {
  const result: any = {};

  if (array.length <= 0) return result;

  for (let i = 0; i < array[0].length; i++) {
    const key = array[0][i];
    result[key] = [];
  }

  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      const key = array[0][j];
      result[key].push(array[i][j]);
    }
  }

  return result;
}
