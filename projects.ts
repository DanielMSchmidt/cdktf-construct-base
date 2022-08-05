export type Project = { name: string; shareWithUsers?: string[] };

const cdktfTeam = ["ansgarm", "xiehan"];
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
  { name: "projen-cdktf-hybrid-construct", shareWithUsers: cdktfTeam },
];
