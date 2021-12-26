const CLIENT_ID = "b4746bffb0ce4926b118609643e4407e";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-library-read"
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

export const handleLogin = () => {
    window.location.href = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
};

export const processData = (data) => {
    const mappedData = data.map(d => {
        return {
            id: d.id,
            link: d.href,
            genres: d.genres,
            image: d.images[0],
            name: d.name
        }
    });
    return mappedData;
};