const BACKEND_URL = 'https://api.deezer.com/genre';

export const getArtists = async () => {
    const requestOptions = {
    method: "GET"
    };

const genre_id = 132

    const response = await fetch(`${BACKEND_URL}/${genre_id}/artists`, requestOptions);

    if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
    }

    const data = await response.json();
    return data.data;

};