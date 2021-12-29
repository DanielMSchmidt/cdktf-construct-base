const { typescript } = require("projen");
const packageJson = require("./package.json");
const projenVersion = packageJson.devDependencies.projen;

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "cdktf-construct-base",

  deps: [`projen@${projenVersion}`],
  description: "A base for my cdktf construct projects",
  packageName: "@dschmidt/cdktf-construct-base",
  release: true,
  releaseToNpm: true,
});
project.synth();
