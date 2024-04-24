const getGenres = async (req, res) => {
    const requestOptions = {
        method: "GET"
    }

    const response = await fetch("https://api.deezer.com/genre", requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch genres");
    }

    const data = await response.json();
    res.status(200).json(data.data)
};

const MusicController = {
    getGenres: getGenres
}

module.exports = MusicController