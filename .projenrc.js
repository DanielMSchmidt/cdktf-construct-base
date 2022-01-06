const { typescript } = require("projen");
const { NpmAccess } = require("projen/lib/javascript");
const packageJson = require("./package.json");
const projenVersion = packageJson.devDependencies.projen;

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "cdktf-construct-base",

  deps: [`projen@${projenVersion}`],
  devDeps: [
    "ts-node@10.4.0",
    "cdktf@0.8.3",
    "cdktf-cli@0.8.3",
    "constructs@10.0.12",
    "@cdktf/provider-github@0.5.98",
  ],
  description: "A base for my cdktf construct projects",
  packageName: "@dschmidt/cdktf-construct-base",
  release: true,
  releaseToNpm: true,
  npmAccess: NpmAccess.PUBLIC,
  autoApproveUpgrades: true,
  autoApproveProjenUpgrades: true,
  autoApproveOptions: {
    label: "auto-approve",
    allowedUsernames: ["DanielMSchmidt", "github-bot"],
  },
  license: "MIT",
  copyrightOwner: "Daniel Schmidt",
  prettier: true,
});

project.addTask("deploy", {
  description: "Deploys the secrets via CDKTF across all projects",
  cwd: "./infrastructure",
  exec: "cdktf apply --auto-approve --ci infrastructure",
});

project.synth();
