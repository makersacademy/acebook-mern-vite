const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getGenres = async () => {
    const requestOptions = {
        method: "GET"
    }

    const response = await fetch(`${BACKEND_URL}/music/genre`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch tracks");
    }

    const data = await response.json();
    return data;
};
