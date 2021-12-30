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

    // TODO: WHY?????
    ghToken.overrideLogicalId("github_token");
    npmToken.overrideLogicalId("npm_token");

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
