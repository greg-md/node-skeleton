import { PubSubEngine } from "graphql-subscriptions"
import { PubSubAsyncIterator } from "graphql-subscriptions/dist/pubsub-async-iterator";
import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { Client } from "nats";

@Injectable()
export class NatsPubSub implements PubSubEngine, OnModuleDestroy {
  constructor(private readonly client: Client) {
    this.client = client;
  }

  public async publish(subject: string, payload: any): Promise<void> {
    this.client.publish(subject, JSON.stringify(payload))
  }

  public async subscribe(subject: string, onMessage: Function): Promise<number> {
    return this.client.subscribe(subject, (event: string) => onMessage(JSON.parse(event)));
  }

  public unsubscribe(sid: number) {
    this.client.unsubscribe(sid);
  }

  public asyncIterator<T>(subjects: string | string[]): AsyncIterator<T> {
    return new PubSubAsyncIterator<T>(this, subjects);
  }

  onModuleDestroy() {
    this.client.close();
  }
}
