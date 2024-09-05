import { setCookieWithExpireHour } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/cookie.js";
import { postJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/api.js";
import { redirect } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/url.js";
import { addCSSIn } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";

window.handleCredentialResponse = gSignIn;
await addCSSIn(
  "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css",
  "idhead"
);

const target_url = "https://ira.ulbi.ac.id/auth/users";

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

async function gSignIn(response) {
  try {
    const gtoken = { token: response.credential };
    await postJSON(target_url, "login", "", gtoken, responsePostFunction);
  } catch (error) {
    console.error("Network or JSON parsing error:", error);
    Swal.fire({
      icon: "error",
      title: "Network Error",
      text: "An error occurred while trying to log in. Please try again.",
    });
  }
}

function showLoader() {
  document.querySelector('.loader-layout').classList.remove('hidden');
}

function hideLoader() {
  document.querySelector('.loader-layout').classList.add('hidden');
}

function responsePostFunction(response) {
  // Show the loader
  showLoader();

  if (response.status === 200 && response.data) {
      // Simulate a delay (if needed) to show the loader effect
      setTimeout(() => {
          // Menyimpan token dalam cookie
          setCookieWithExpireHour("login", response.data.token, 18);

          // Menampilkan greeting menggunakan SweetAlert
          Swal.fire({
              icon: "success",
              title: "Welcome!",
              text: `Hello, ${response.data.user?.nama || "User"}!`,
              showConfirmButton: false,
              timer: 2000,
          }).then(() => {
              setTimeout(() => {
                  const login = getCookie("login");
                  const redirectUrl = getCookie("redirect");

                  if (!login) {
                      Swal.fire({
                          icon: "error",
                          title: "Login Failed",
                          text: "An error occurred while trying to log in. Please try again.",
                      }).then(() => {
                          redirect("/");
                      });
                  } else if (redirectUrl) {
                      Swal.fire({
                          icon: "error",
                          title: "Login Failed",
                          text: "An error occurred while trying to log in. Please try again.",
                      }).then(() => {
                          redirect(redirectUrl);
                      });
                  } else {
                      console.error(
                          "Login failed:",
                          response.data?.message || "Unknown error"
                      );
                      Swal.fire({
                          icon: "error",
                          title: "Login Failed",
                          text: response.data?.message || "An unknown error occurred.",
                      }).then(() => {
                          redirect("/");
                      });
                  }

                  // Hide the loader
                  hideLoader();
              }, 2000); // Adjust the delay as needed
          });
      }, 2000); // Adjust the delay to match your animation duration
  } else {
      // Handle non-200 responses
      hideLoader();
  }
}

