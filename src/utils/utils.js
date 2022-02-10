export const CLIENT_ID = "b4746bffb0ce4926b118609643e4407e";
export const CLIENT_SECRET = "4955b4ac469443edab9e997e6892fffe"
export const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
export const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/";
export const SPACE_DELIMITER = "%20";
export const SCOPES = [
  "user-library-read"
];
export const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

export const handleLogin = () => {
    window.location.href = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=code&show_dialog=true`;
};
