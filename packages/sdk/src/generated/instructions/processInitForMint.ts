/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from "@metaplex-foundation/beet";
import * as web3 from "@solana/web3.js";

/**
 * @category Instructions
 * @category ProcessInitForMint
 * @category generated
 */
export type ProcessInitForMintInstructionArgs = {
  bumpSeed: number;
};
/**
 * @category Instructions
 * @category ProcessInitForMint
 * @category generated
 */
const processInitForMintStruct = new beet.BeetArgsStruct<
  ProcessInitForMintInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ["instructionDiscriminator", beet.uniformFixedSizeArray(beet.u8, 8)],
    ["bumpSeed", beet.u8],
  ],
  "ProcessInitForMintInstructionArgs"
);
/**
 * Accounts required by the _processInitForMint_ instruction
 * @category Instructions
 * @category ProcessInitForMint
 * @category generated
 */
export type ProcessInitForMintInstructionAccounts = {
  authority: web3.PublicKey;
  fanout: web3.PublicKey;
  fanoutForMint: web3.PublicKey;
  mintHoldingAccount: web3.PublicKey;
  mint: web3.PublicKey;
};

const processInitForMintInstructionDiscriminator = [
  140, 150, 232, 195, 93, 219, 35, 170,
];

/**
 * Creates a _ProcessInitForMint_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category ProcessInitForMint
 * @category generated
 */
export function createProcessInitForMintInstruction(
  accounts: ProcessInitForMintInstructionAccounts,
  args: ProcessInitForMintInstructionArgs
) {
  const { authority, fanout, fanoutForMint, mintHoldingAccount, mint } =
    accounts;

  const [data] = processInitForMintStruct.serialize({
    instructionDiscriminator: processInitForMintInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: authority,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: fanout,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: fanoutForMint,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: mintHoldingAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: mint,
      isWritable: false,
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
