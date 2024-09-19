import { CihuyGetCookie } from "https://c-craftjs.github.io/cookies/cookies.js";

let redirectUrl = CihuyGetCookie("redirect")

if (!redirectUrl) {
    Swal.fire({
        tittle: "info",
        text: "Kakak pilih sistem nya dulu yaa",
        icon: "info",
        confirmButtonText: "OK",
        allowOutsideClick: false, 
        allowEscapeKey: false, 
        allowEnterKey: false, 
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "http://login.ulbi.ac.id/page/";
        }
    })
}