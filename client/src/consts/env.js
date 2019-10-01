const DB_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ?
    "http://localhost:5000" : "https://app-point.herokuapp.com";
export {
    DB_URL
};