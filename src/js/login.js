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
            l
        }

    }
}