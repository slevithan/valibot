import type {
  BaseIssue,
  BaseSchema,
  BaseSchemaAsync,
  ErrorMessage,
  InferInput,
  InferIssue,
  InferOutput,
  NonOptional,
} from '../../types/index.ts';
import type { UnionIssue, UnionOptions, UnionSchema } from '../union/index.ts';

/**
 * Non optional issue type.
 */
export interface NonOptionalIssue extends BaseIssue<unknown> {
  /**
   * The issue kind.
   */
  readonly kind: 'schema';
  /**
   * The issue type.
   */
  readonly type: 'non_optional';
  /**
   * The expected input.
   */
  readonly expected: '!undefined';
}

/**
 * Infer non optional input type.
 */
export type InferNonOptionalInput<
  TWrapped extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
> = NonOptional<InferInput<TWrapped>>;

/**
 * Infer non optional output type.
 */
export type InferNonOptionalOutput<
  TWrapped extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
> =
  // FIXME: For schemas that transform the input to `undefined`, this
  // implementation may result in an incorrect output type
  NonOptional<InferOutput<TWrapped>>;

/**
 * Infer non optional issue type.
 */
export type InferNonOptionalIssue<
  TWrapped extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
> =
  TWrapped extends UnionSchema<
    UnionOptions,
    ErrorMessage<UnionIssue<BaseIssue<unknown>>> | undefined
  >
    ?
        | Exclude<InferIssue<TWrapped>, { type: 'undefined' | 'union' }>
        | UnionIssue<InferNonOptionalIssue<TWrapped['options'][number]>>
    : Exclude<InferIssue<TWrapped>, { type: 'undefined' }>;
