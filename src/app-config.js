export const HOME_PATH = process.env.PUBLIC_URL + "/";

let BACKEND_URL = "http://ec2-18-184-61-80.eu-central-1.compute.amazonaws.com";
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  BACKEND_URL = "http://localhost"
}
const BACKEND_PORT = "8666";
export const BACKEND_ADDRESS = BACKEND_URL + ":" + BACKEND_PORT;
console.log("Backend location is: ", BACKEND_ADDRESS);