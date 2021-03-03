import { Injectable } from '@nestjs/common';
import { Hello, HelloMetadata } from './hello';
import { HelloObject } from './hello.object';

@Injectable()
export class HelloObjectify {
  objectify(hello: Hello): HelloObject {
    return this.objectifyMetadata(hello.toMetadata());
  }

  objectifyMetadata(metadata: HelloMetadata): HelloObject {
    return {
      name: metadata.name,
    };
  }
}
