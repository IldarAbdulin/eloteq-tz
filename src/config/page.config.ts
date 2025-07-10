export const PAGES = {
  PROFILE: `/profile`,
  REPOSITORIES: `/repositories`,
  USERS_SEARCH: `/users-search`,
  USER_DETAIL: `/user/:username`,
  AUTH: `/auth`,
  AUTH_CALLBACK: `/auth/callback`,
};

export const DYNAMIC_PAGES = {
  USER_DETAIL: (username: string) => `/user/${username}`,
};
