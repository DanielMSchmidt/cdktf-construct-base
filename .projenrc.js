const { typescript } = require("projen");
const packageJson = require("./package.json");
const projenVersion = packageJson.devDependencies.projen;

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "cdktf-construct-base",

  deps: [`projen@${projenVersion}`],
  devDeps: [
    "ts-node@10.4.0",
    "cdktf@0.8.3",
    "constructs@10.0.12",
    "@cdktf/provider-github@0.5.98",
  ],
  description: "A base for my cdktf construct projects",
  packageName: "@dschmidt/cdktf-construct-base",
  release: true,
  releaseToNpm: true,
});
project.synth();
