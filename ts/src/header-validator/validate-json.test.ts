import { strict as assert } from 'assert'
import * as context from './context'
import { Maybe } from './maybe'
import * as testutil from './util.test'
import * as vsv from '../vendor-specific-values'

export type TestCase<T> = testutil.TestCase & {
  name: string
  json: string
  vsv?: Readonly<Partial<vsv.VendorSpecificValues>>
  expected?: Maybe<T>
}

export function run<T>(
  tc: TestCase<T>,
  f: () => [context.ValidationResult, Maybe<T>]
): void {
  const [validationResult, value] = f()
  testutil.run(tc, tc.name, () => validationResult)

  if (tc.expected !== undefined) {
    assert.deepEqual(value, tc.expected, tc.name)
  }
}
