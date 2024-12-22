async function postLogin(username, password) {
    const url = `${import.meta.env.VITE_API_URL}/api-token-auth/`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username": username,
            "password": password,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to login`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    const data = await response.json();
    
    // Get user ID from a second request using the token
    const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/projects/`, {
        headers: {
            "Authorization": `Token ${data.token}`
        }
    });
    
    if (!userResponse.ok) {
        throw new Error("Could not get user details");
    }
    
    const projects = await userResponse.json();
    const userId = projects[0]?.owner || null;  // Get user ID from first project

    return {
        ...data,
        user_id: userId
    };
}

export default postLogin;