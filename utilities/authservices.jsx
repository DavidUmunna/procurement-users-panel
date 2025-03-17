import createAuth0Client from "@auth0/auth0-spa-js";

let auth0 = null;

export const initAuth0 = async () => {
  auth0 = await createAuth0Client({
    domain: "<AUTH0_DOMAIN>",
    client_id: "<AUTH0_CLIENT_ID>",
    redirect_uri: window.location.origin // Redirects back to your app after login
  });
};

export const login = async () => {
  if (!auth0) await initAuth0();
  await auth0.loginWithRedirect();
};

export const handleRedirectCallback = async () => {
  if (!auth0) await initAuth0();
  const result = await auth0.handleRedirectCallback();
  return result;
};

export const getUser = async () => {
  if (!auth0) await initAuth0();
  return await auth0.getUser();
};

export const logout = () => {
  auth0.logout({
    returnTo: window.location.origin,
  });
};
