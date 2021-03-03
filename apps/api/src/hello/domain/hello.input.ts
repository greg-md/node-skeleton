import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class HelloInput {
  @Field(() => String)
  readonly name: string;
}
