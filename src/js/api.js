export const endpointAuth = "https://ira.ulbi.ac.id/auth/users"

export const postJSON = async (url, { body, headers }) => {
    const response = await fetch(url, {
        method: 'POST',
        body,
        headers: {
            "Content-Type": "application/json",
            ...headers, // merge any additional headers
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
};
