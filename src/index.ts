import { ConstructLibrary, ConstructLibraryOptions } from "projen/lib/cdk";

export class CDKTFConstruct extends ConstructLibrary {
  constructor(options: ConstructLibraryOptions) {
    super({
      ...options,
      prettier: true,
      publishToPypi: {
        distName: options.name,
        module: options.name.replace(/-/g, "_"),
      },
    });

    const cdktfVersion = "^0.8.5";
    const constructVersion = "^10.0.25";

    this.addPeerDeps(`constructs@${constructVersion}`, `cdktf@${cdktfVersion}`);
    this.addKeywords("cdktf");

    // ignore dist in tests
    this.jest?.addIgnorePattern("dist");
  }
}

export default CDKTFConstruct;
