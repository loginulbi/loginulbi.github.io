import { postJSON } from "./api.js"
import { endpointAuth } from "./api.js"

script.src = "https://accounts.google.com/gsi/client"

export const login = async (req, res) => {
        console.log("Encoded JWT ID token: " + res.credential);
        try {
            const result = await fetch(endpointAuth, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: res.credential })
            });
            const data = await result.json();
            if (res.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome to ULBI',
                    text: `Hello, ${data.user}!`,
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.href = "https://login.ulbi.ac.id/auth/";
                });
            } else {
                if (res.status === 401) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Authentication Failed',
                        text: 'Please check your credentials and try again.',
                        showConfirmButton: true,
                        confirmButtonText: 'Try Again',
                        timer: 2000
                    }).then(() => {
                        window.location.href = "/";
                    });
                }
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'An Error Occurred',
                text: 'An error occurred while trying to login. Please try again later.',
            });
        }
    }