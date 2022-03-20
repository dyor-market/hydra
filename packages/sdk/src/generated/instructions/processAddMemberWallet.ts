/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as splToken from "@solana/spl-token";
import * as definedTypes from "../types";
import * as beet from "@metaplex-foundation/beet";
import * as web3 from "@solana/web3.js";

/**
 * @category Instructions
 * @category ProcessAddMemberWallet
 * @category generated
 */
export type ProcessAddMemberWalletInstructionArgs = {
  args: definedTypes.AddMemberArgs;
};
/**
 * @category Instructions
 * @category ProcessAddMemberWallet
 * @category generated
 */
const processAddMemberWalletStruct = new beet.BeetArgsStruct<
  ProcessAddMemberWalletInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ["instructionDiscriminator", beet.uniformFixedSizeArray(beet.u8, 8)],
    ["args", definedTypes.addMemberArgsBeet],
  ],
  "ProcessAddMemberWalletInstructionArgs"
);
/**
 * Accounts required by the _processAddMemberWallet_ instruction
 * @category Instructions
 * @category ProcessAddMemberWallet
 * @category generated
 */
export type ProcessAddMemberWalletInstructionAccounts = {
  authority: web3.PublicKey;
  member: web3.PublicKey;
  fanout: web3.PublicKey;
  membershipAccount: web3.PublicKey;
};

const processAddMemberWalletInstructionDiscriminator = [
  201, 9, 59, 128, 69, 117, 220, 235,
];

/**
 * Creates a _ProcessAddMemberWallet_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category ProcessAddMemberWallet
 * @category generated
 */
export function createProcessAddMemberWalletInstruction(
  accounts: ProcessAddMemberWalletInstructionAccounts,
  args: ProcessAddMemberWalletInstructionArgs
) {
  const { authority, member, fanout, membershipAccount } = accounts;

  const [data] = processAddMemberWalletStruct.serialize({
    instructionDiscriminator: processAddMemberWalletInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: authority,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: member,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: fanout,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: membershipAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: web3.SYSVAR_RENT_PUBKEY,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: splToken.TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    },
  ];

  const ix = new web3.TransactionInstruction({
    programId: new web3.PublicKey(
      "AwAY5hd99UhrrPEBapahSEW2tXBQTFVvHpd3sVmaDWfA"
    ),
    keys,
    data,
  });
  return ix;
}
