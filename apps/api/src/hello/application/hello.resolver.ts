import { Resolver, Subscription, Query, Mutation, Args } from '@nestjs/graphql';
import { HelloObject } from '../domain/hello.object';
import { HelloObjectify } from '../domain/hello.objectify';
import { Hello, HelloMetadata } from '../domain/hello';
import { HelloInput } from '../domain/hello.input';
import { HelloPubSub } from '../infrastructure/hello.pub-sub';

@Resolver('Hello')
export class HelloResolver {
  constructor(
    private helloPubSub: HelloPubSub,
    private helloObjectify: HelloObjectify,
  ) {}

  @Query(returns => HelloObject, { description: 'Say hello world.' })
  async helloWorld(): Promise<HelloObject> {
    const hello = new Hello('World');

    return this.helloObjectify.objectify(hello);
  }

  @Mutation(returns => HelloObject, { description: 'Say hello to someone.' })
  async sayHello(@Args('hello') helloInput: HelloInput): Promise<HelloObject> {
    const hello = new Hello(helloInput.name);

    return this.helloObjectify.objectify(hello);
  }

  @Subscription(returns => HelloObject,  {
    resolve(this: HelloResolver, payload: HelloMetadata, args, context) {
      return this.helloObjectify.objectifyMetadata(payload);
    },
  })
  onHello() {
    return this.helloPubSub.onHelloAsyncIterator();
  }
}
