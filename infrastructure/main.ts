import { Construct } from "constructs";
import { App, TerraformStack, RemoteBackend, TerraformVariable } from "cdktf";
import * as gh from "@cdktf/provider-github";
import { projects } from "../projects";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    const ghToken = new TerraformVariable(this, "github_token", {
      type: "string",
      sensitive: true,
    });
    const npmToken = new TerraformVariable(this, "npm_token", {
      type: "string",
      sensitive: true,
    });
    const pythonUsername = new TerraformVariable(this, "TWINE_USERNAME", {
      type: "string",
      sensitive: true,
    });
    const pythonToken = new TerraformVariable(this, "TWINE_PASSWORD", {
      type: "string",
      sensitive: true,
    });

    // TODO: WHY?????
    ghToken.overrideLogicalId("github_token");
    npmToken.overrideLogicalId("npm_token");
    pythonUsername.overrideLogicalId("TWINE_USERNAME");
    pythonToken.overrideLogicalId("TWINE_PASSWORD");

    new gh.GithubProvider(this, "github", {
      token: ghToken.value,
    });

    projects.forEach((project) => {
      const repo = new gh.DataGithubRepository(this, `${project.name}-repo`, {
        name: project.name,
      });

      // Set the npm token on each repo
      new gh.ActionsSecret(this, `${project.name}-npm`, {
        secretName: `NPM_TOKEN`,
        repository: repo.name,
        plaintextValue: npmToken.value,
      });

      // Set the python username and token on each repo
      new gh.ActionsSecret(this, `${project.name}-python-username`, {
        secretName: `TWINE_USERNAME`,
        repository: repo.name,
        plaintextValue: pythonUsername.value,
      });
      new gh.ActionsSecret(this, `${project.name}-python-password`, {
        secretName: `TWINE_PASSWORD`,
        repository: repo.name,
        plaintextValue: pythonToken.value,
      });
    });
  }
}

const app = new App();
const stack = new MyStack(app, "infrastructure");
new RemoteBackend(stack, {
  hostname: "app.terraform.io",
  organization: "danielmschmidt",
  workspaces: {
    name: "cdktf-projects",
  },
});
app.synth();
