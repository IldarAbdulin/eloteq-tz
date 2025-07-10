export const API_URIS = {
  AUTH_URL: `${import.meta.env.VITE_GITHUB_OAUTH_URL}/authorize?client_id=${
    import.meta.env.VITE_GITHUB_CLIENT_ID
  }&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&scope=user`,
};
