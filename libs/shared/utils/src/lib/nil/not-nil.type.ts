import { Nil } from './nil.type';

export type NotNil<T = unknown> = T extends Nil ? never : T;
