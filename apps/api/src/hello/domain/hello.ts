export type HelloMetadata = {
  readonly name: string;
};

export class Hello {
  constructor(public readonly name: string) {}

  toMetadata(): HelloMetadata {
    return {
      name: this.name,
    };
  }

  static fromMetadata(metadata: HelloMetadata): Hello {
    return new Hello(metadata.name);
  }
}
