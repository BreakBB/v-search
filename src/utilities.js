function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

export function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach((b) => binary += String.fromCharCode(b));

  return window.btoa(binary);
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

export function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function processMovieArray(movies) {
  return movies.map((movie) => processMovie(movie));
}

export function processMovie(movie) {
  if (movie.star_rating === 0) {
    movie.star_rating = "-";
  }
  if (movie.imdb_rating === 0) {
    movie.imdb_rating = "-";
  }
  if (movie.genres === null) {
    movie.genres = ["-"];
  }
  if (movie.year === 0) {
    movie.year = "-";
  }
  if (movie.maturity_rating === null) {
    movie.maturity_rating = "-";
  }
  return movie;
}