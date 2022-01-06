import { ConstructLibrary, ConstructLibraryOptions } from 'projen/lib/cdk';

export class CDKTFConstruct extends ConstructLibrary {
  constructor(options: ConstructLibraryOptions) {
    super(options);

    const cdktfVersion = '^0.8.5';
    const constructVersion = '^10.0.25';

    this.addPeerDeps(`constructs@${constructVersion}`, `cdktf@${cdktfVersion}`);
    this.addKeywords('cdktf');

    // cleanup dist before test run
    this.testTask.prependExec('rm -rf dist');
  }
}

export default CDKTFConstruct;
