import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HelloObject {
  @Field(type => String)
  name: string;
}
