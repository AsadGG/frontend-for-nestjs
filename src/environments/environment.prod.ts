const protocol = `http`;
const domain = `localhost`;
const port = `3000`;

export const environment = {
  production: true,
  baseUrl: `${protocol}://${domain}${port ? `:${port}` : ``}`,
};
