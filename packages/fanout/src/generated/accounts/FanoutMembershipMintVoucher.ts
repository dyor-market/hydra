/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from "@solana/web3.js";
import * as beet from "@metaplex-foundation/beet";
import * as beetSolana from "@metaplex-foundation/beet-solana";

/**
 * Arguments used to create {@link FanoutMembershipMintVoucher}
 * @category Accounts
 * @category generated
 */
export type FanoutMembershipMintVoucherArgs = {
  fanoutMint: web3.PublicKey;
  lastInflow: beet.bignum;
  bumpSeed: number;
  amountAtStake: beet.COption<beet.bignum>;
};

const fanoutMembershipMintVoucherDiscriminator = [
  185, 33, 118, 173, 147, 114, 126, 181,
];
/**
 * Holds the data for the {@link FanoutMembershipMintVoucher} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class FanoutMembershipMintVoucher
  implements FanoutMembershipMintVoucherArgs
{
  private constructor(
    readonly fanoutMint: web3.PublicKey,
    readonly lastInflow: beet.bignum,
    readonly bumpSeed: number,
    readonly amountAtStake: beet.COption<beet.bignum>
  ) {}

  /**
   * Creates a {@link FanoutMembershipMintVoucher} instance from the provided args.
   */
  static fromArgs(args: FanoutMembershipMintVoucherArgs) {
    return new FanoutMembershipMintVoucher(
      args.fanoutMint,
      args.lastInflow,
      args.bumpSeed,
      args.amountAtStake
    );
  }

  /**
   * Deserializes the {@link FanoutMembershipMintVoucher} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0
  ): [FanoutMembershipMintVoucher, number] {
    return FanoutMembershipMintVoucher.deserialize(accountInfo.data, offset);
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link FanoutMembershipMintVoucher} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey
  ): Promise<FanoutMembershipMintVoucher> {
    const accountInfo = await connection.getAccountInfo(address);
    if (accountInfo == null) {
      throw new Error(
        `Unable to find FanoutMembershipMintVoucher account at ${address}`
      );
    }
    return FanoutMembershipMintVoucher.fromAccountInfo(accountInfo, 0)[0];
  }

  /**
   * Deserializes the {@link FanoutMembershipMintVoucher} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(
    buf: Buffer,
    offset = 0
  ): [FanoutMembershipMintVoucher, number] {
    return fanoutMembershipMintVoucherBeet.deserialize(buf, offset);
  }

  /**
   * Serializes the {@link FanoutMembershipMintVoucher} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return fanoutMembershipMintVoucherBeet.serialize({
      accountDiscriminator: fanoutMembershipMintVoucherDiscriminator,
      ...this,
    });
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link FanoutMembershipMintVoucher} for the provided args.
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   */
  static byteSize(args: FanoutMembershipMintVoucherArgs) {
    const instance = FanoutMembershipMintVoucher.fromArgs(args);
    return fanoutMembershipMintVoucherBeet.toFixedFromValue({
      accountDiscriminator: fanoutMembershipMintVoucherDiscriminator,
      ...instance,
    }).byteSize;
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link FanoutMembershipMintVoucher} data from rent
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    args: FanoutMembershipMintVoucherArgs,
    connection: web3.Connection,
    commitment?: web3.Commitment
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      FanoutMembershipMintVoucher.byteSize(args),
      commitment
    );
  }

  /**
   * Returns a readable version of {@link FanoutMembershipMintVoucher} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      fanoutMint: this.fanoutMint.toBase58(),
      lastInflow: this.lastInflow,
      bumpSeed: this.bumpSeed,
      amountAtStake: this.amountAtStake,
    };
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const fanoutMembershipMintVoucherBeet = new beet.FixableBeetStruct<
  FanoutMembershipMintVoucher,
  FanoutMembershipMintVoucherArgs & {
    accountDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ["accountDiscriminator", beet.uniformFixedSizeArray(beet.u8, 8)],
    ["fanoutMint", beetSolana.publicKey],
    ["lastInflow", beet.u64],
    ["bumpSeed", beet.u8],
    ["amountAtStake", beet.coption(beet.u64)],
  ],
  FanoutMembershipMintVoucher.fromArgs,
  "FanoutMembershipMintVoucher"
);
