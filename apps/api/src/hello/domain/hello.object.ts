import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HelloObject {
  @Field(() => String)
  name: string;
}
