function getRangeValues(start, end, steps, fraction = 1) {
  let elements = [];
  for (let i = start; i <= end; i += steps) {
    elements.push(i.toFixed(fraction));
  }
  return elements;
}

export const RATINGS = getRangeValues(1, 5, 0.5);

export const IMDB_RATINGS = getRangeValues(1, 10, 0.1);

export const YEARS = getRangeValues(1900, 2018, 1, 0);

export const FSK = [0, 6, 12, 16, 18];