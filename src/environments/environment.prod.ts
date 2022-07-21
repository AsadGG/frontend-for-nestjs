const protocol = `http`;
const domain = `localhost`;
const port = `3000`;

const BASE_URL =
  process.env['ANGULAR_APP_BASE_URL'] ||
  `${protocol}://${domain}${port ? `:${port}` : ``}`;

export const environment = {
  production: true,
  baseUrl: BASE_URL,
};
