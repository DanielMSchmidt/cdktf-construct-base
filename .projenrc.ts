import { TextFile, typescript } from "projen";
import { NpmAccess } from "projen/lib/javascript";
import { projects } from "./projects";

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "cdktf-construct-base",

  deps: [`projen`],
  devDeps: [
    "ts-node",
    "cdktf",
    "cdktf-cli",
    "constructs",
    "@cdktf/provider-github",
  ],
  description: "A base for my cdktf construct projects",
  packageName: "@dschmidt/cdktf-construct-base",
  release: true,
  releaseToNpm: true,
  npmAccess: NpmAccess.PUBLIC,
  autoApproveUpgrades: true,
  autoApproveOptions: {
    label: "auto-approve",
    allowedUsernames: ["DanielMSchmidt", "github-bot"],
  },
  license: "MIT",
  copyrightOwner: "Daniel Schmidt",
  prettier: true,
  projenrcTs: true,
});

project.addTask("deploy", {
  description: "Deploys the secrets via CDKTF across all projects",
  cwd: "./infrastructure",
  exec: "cdktf apply --auto-approve --ci infrastructure",
});

project.addDevDeps("ts-node@10.9.1");

new TextFile(project, "projects.md", {
  committed: true,
  readonly: true,
  lines: [
    "# Projects managed by this Repository",
    "",
    ...projects.map(
      (p) => `- [${p.name}](https://github.com/DanielMSchmidt/${p.name})`
    ),
    "",
  ],
});

project.synth();
