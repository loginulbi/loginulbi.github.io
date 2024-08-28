import { postJSON } from "./api.js";
import { endpointAuth } from "./api.js";

export const handleCredentialResponse = async (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    try {
        const result = await fetch(endpointAuth, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: response.credential })
        });
        const data = await result.json();
        if (result.ok) {  // Changed from res.ok to result.ok
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
            if (result.status === 401) {  // Changed from res.status to result.status
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
};

// Export function if you need to import it somewhere else
export const login = handleCredentialResponse;
