import { CihuyGetCookie } from "https://c-craftjs.github.io/cookies/cookies.js";

let redirectUrl = CihuyGetCookie("redirect")

if (!redirectUrl) {
    window.location.href = "http://login.ulbi.ac.id/page/";
}