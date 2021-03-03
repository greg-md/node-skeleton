import { Injectable } from "@nestjs/common";
import { PubSubEngine } from "graphql-subscriptions";
import { HelloMetadata } from "../domain/hello";

export const HelloEvents = {
  sayHello: 'SayHello',
};

@Injectable()
export class HelloPubSub {
  constructor(
    private pubSub: PubSubEngine,
  ) {}

  onHelloAsyncIterator() {
    return this.pubSub.asyncIterator<HelloMetadata>(HelloEvents.sayHello);
  }
}
