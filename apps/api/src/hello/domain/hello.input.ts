import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class HelloInput {
  @Field(type => String)
  readonly name: string;
}
