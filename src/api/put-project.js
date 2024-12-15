async function putProject(title, description, goal, image, projectId) {
    const token = window.localStorage.getItem("token");
    const email = window.localStorage.getItem("email");
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
            "title": title,
            "description": description,
            "goal": goal,
            "image": image,
            "user_email": email
        }),
    });

    if (!response.ok) {
        const data = await response.json().catch(() => ({
            detail: 'Failed to update project'
        }));
        throw new Error(data.detail);
    }

    return await response.json();
}

export default putProject;