import { postJSON } from "./api.js"
import { endpointAuth } from "./api.js"

script.src = "https://accounts.google.com/gsi/client"

export const login = async (req, res) => {
    try {
        const res = await postJSON(`${endpointAuth}`, {
            body: JSON.stringify({
                token: response.credential
            }),
        })
        const data = await res.json();
        if (res.ok){
            console.log(data);
            swal.fire({
                icon: "success",
                title: "Welcome to ULBI",
                text: `hello, ${data.user}!`,
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                window.location.href = "https://login.ulbi.ac.id/auth/";
            });
        } else {
            if (res.status === 401) {
                await swal.fire({
                    icon: "error",
                    title: "Authentication Failed",
                    text: "Please check your credentials and try again.",
                    showConfirmButton: true,
                    confirmButtonText: "Try Again",
                    timer: 2000
                }).then(() => {
                    window.location.href = "/";
                });
            }
        }

    } catch (error) {
        console.error(error);
        await swal.fire({
            icon: "error",
            title: "An Error Occurred",
            text: "An error occurred while trying to login. Please try again later.",
        });
    }
}