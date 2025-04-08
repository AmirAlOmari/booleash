import { Field, ObjectType } from '@nestjs/graphql';
import { FeatureToggleEntity } from './feature-toggle.entity';

@ObjectType()
export class FeatureToggleObjectType implements FeatureToggleEntity {
  @Field(() => String)
  public name: string;

  @Field(() => Boolean)
  public isControlled: boolean;

  @Field(() => Boolean)
  public isEnabled: boolean;
}
