export type Project = { name: string; shareWithUsers?: string[] };

const cdktfTeam = ["ansgarm", "skorfmann", "xiehan", "schersh"];
export const projects: Project[] = [
  { name: "cdktf-construct-base" },
  { name: "cdktf-local-exec" },
  { name: "cdktf-local-build" },
  { name: "cdktf-cdk8s", shareWithUsers: cdktfTeam },
  { name: "cdktf-multi-stack-tfe", shareWithUsers: cdktfTeam },
  {
    name: "cdktf-tf-module-stack",
    shareWithUsers: cdktfTeam,
  },
];
