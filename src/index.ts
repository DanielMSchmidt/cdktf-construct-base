import { ConstructLibrary, ConstructLibraryOptions } from 'projen/lib/cdk';

export class CDKTFConstruct extends ConstructLibrary {
  constructor(options: ConstructLibraryOptions) {
    super(options);

    const cdktfVersion = '^0.8.3';
    const constructVersion = '^10.0.12';

    this.addPeerDeps(`constructs@${constructVersion}`, `cdktf@${cdktfVersion}`);
    this.addKeywords('cdktf');
  }
}

export default CDKTFConstruct;
