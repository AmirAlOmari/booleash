import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { FeatureToggleObjectType } from './feature-toggle.object-type';

@InputType()
export class UpsertFeatureToggleInputType extends IntersectionType(
  PickType(FeatureToggleObjectType, ['name']),
  PartialType(FeatureToggleObjectType),
  InputType,
) {}
