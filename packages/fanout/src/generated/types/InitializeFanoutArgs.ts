/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from "@metaplex-foundation/beet";
export type InitializeFanoutArgs = {
  bumpSeed: number;
  nativeAccountBumpSeed: number;
  name: string;
  totalShares: beet.bignum;
};

/**
 * @category userTypes
 * @category generated
 */
export const initializeFanoutArgsBeet =
  new beet.FixableBeetArgsStruct<InitializeFanoutArgs>(
    [
      ["bumpSeed", beet.u8],
      ["nativeAccountBumpSeed", beet.u8],
      ["name", beet.utf8String],
      ["totalShares", beet.u64],
    ],
    "InitializeFanoutArgs"
  );
