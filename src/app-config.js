const PUBLIC_URL = process.env.PUBLIC_URL;
export const HOME_PATH = PUBLIC_URL + "/";
export const RATING_PATH = PUBLIC_URL + "/rating";

// Check for dev environment
let BACKEND_URL = "http://ec2-18-184-61-80.eu-central-1.compute.amazonaws.com";
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  BACKEND_URL = "http://localhost"
}
const BACKEND_PORT = "8666";
const BACKEND_ADDRESS = BACKEND_URL + ":" + BACKEND_PORT + '/';
console.log("Backend location is: ", BACKEND_ADDRESS);

export const API_LOGIN = BACKEND_ADDRESS + 'api/login/';

const API_DE = BACKEND_ADDRESS + 'api/de/';
const API_COM = BACKEND_ADDRESS + 'api/com/';
const MOVIES = 'movies/';
const GENRES = 'genres/';

export const API_DE_MOVIES = API_DE + MOVIES;
export const API_DE_GENRES = API_DE + GENRES;

export const API_COM_MOVIES = API_COM + MOVIES;
export const API_COM_GENRES = API_COM + GENRES;
