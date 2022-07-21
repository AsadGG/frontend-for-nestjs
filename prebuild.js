const fs = require("fs");
const path = require("path");

const ejs = require("ejs");

const environmentFilesDirectory = path.join(__dirname, "./src/environments");
const targetEnvironmentTemplateFileName = "environment.prod.ts.template";
const targetEnvironmentFileName = "environment.prod.ts";

const protocol = `http`;
const domain = `localhost`;
const port = `3000`;
console.log(1);

// Define default values in case there are no defined ones,
// but you should define only non-crucial values here,
// because build should fail if you don't provide the correct values
// for your production environment
const defaultEnvValues = {
  ANGULAR_APP_BASE_URL: `${protocol}://${domain}${port ? `:${port}` : ``}`,
};
console.log(2);

// Load template file
const environmentTemplate = fs.readFileSync(
  path.join(environmentFilesDirectory, targetEnvironmentTemplateFileName),
  { encoding: "utf-8" }
);
console.log(3);

// Generate output data
const output = ejs.render(
  environmentTemplate,
  Object.assign({}, defaultEnvValues, process.env)
);
console.log(4);

// Write environment file
fs.writeFileSync(
  path.join(environmentFilesDirectory, targetEnvironmentFileName),
  output
);

process.exit(0);
