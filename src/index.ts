import { ConstructLibrary, ConstructLibraryOptions } from "projen/lib/cdk";

export class CDKTFConstruct extends ConstructLibrary {
  constructor(options: ConstructLibraryOptions) {
    super({
      ...options,
      prettier: true,
      projenrcTs: true,
      autoApproveOptions: {
        allowedUsernames: ["DanielMSchmidt"],
        label: "auto-approve",
      },
      autoApproveProjenUpgrades: true,
      autoApproveUpgrades: true,
      publishToPypi: {
        distName: options.name,
        module: options.name.replace(/-/g, "_"),
      },
    });

    const cdktfVersion = "^0.10.1";
    const constructVersion = "^10.0.107";

    this.addPeerDeps(`constructs@${constructVersion}`, `cdktf@${cdktfVersion}`);
    this.addKeywords("cdktf");

    // ignore dist in tests
    this.jest?.addIgnorePattern("dist");
  }
}

export default CDKTFConstruct;
