import { struct, u32, u8 } from '@solana/buffer-layout';
import { publicKey, u64 } from '@solana/buffer-layout-utils';
import { TOKEN_PROGRAM_ID } from './../constants.mjs';
import { TokenAccountNotFoundError, TokenInvalidAccountError, TokenInvalidAccountOwnerError, TokenInvalidAccountSizeError, } from './../errors.mjs';
import { MULTISIG_SIZE } from './multisig.mjs';
import { AccountType, ACCOUNT_TYPE_SIZE } from './../extensions/accountType.mjs';
import { getAccountLen } from './../extensions/extensionType.mjs';
/** Token account state as stored by the program */
export var AccountState;
(function (AccountState) {
    AccountState[AccountState["Uninitialized"] = 0] = "Uninitialized";
    AccountState[AccountState["Initialized"] = 1] = "Initialized";
    AccountState[AccountState["Frozen"] = 2] = "Frozen";
})(AccountState || (AccountState = {}));
/** Buffer layout for de/serializing a token account */
export const AccountLayout = struct([
    publicKey('mint'),
    publicKey('owner'),
    u64('amount'),
    u32('delegateOption'),
    publicKey('delegate'),
    u8('state'),
    u32('isNativeOption'),
    u64('isNative'),
    u64('delegatedAmount'),
    u32('closeAuthorityOption'),
    publicKey('closeAuthority'),
]);
/** Byte length of a token account */
export const ACCOUNT_SIZE = AccountLayout.span;
/**
 * Retrieve information about a token account
 *
 * @param connection Connection to use
 * @param address    Token account
 * @param commitment Desired level of commitment for querying the state
 * @param programId  SPL Token program account
 *
 * @return Token account information
 */
export async function getAccount(connection, address, commitment, programId = TOKEN_PROGRAM_ID) {
    const info = await connection.getAccountInfo(address, commitment);
    return unpackAccount(info, address, programId);
}
/**
 * Retrieve information about multiple token accounts in a single RPC call
 *
 * @param connection Connection to use
 * @param addresses  Token accounts
 * @param commitment Desired level of commitment for querying the state
 * @param programId  SPL Token program account
 *
 * @return Token account information
 */
export async function getMultipleAccounts(connection, addresses, commitment, programId = TOKEN_PROGRAM_ID) {
    const infos = await connection.getMultipleAccountsInfo(addresses, commitment);
    const accounts = [];
    for (let i = 0; i < infos.length; i++) {
        const account = unpackAccount(infos[i], addresses[i], programId);
        accounts.push(account);
    }
    return accounts;
}
/** Get the minimum lamport balance for a base token account to be rent exempt
 *
 * @param connection Connection to use
 * @param commitment Desired level of commitment for querying the state
 *
 * @return Amount of lamports required
 */
export async function getMinimumBalanceForRentExemptAccount(connection, commitment) {
    return await getMinimumBalanceForRentExemptAccountWithExtensions(connection, [], commitment);
}
/** Get the minimum lamport balance for a rent-exempt token account with extensions
 *
 * @param connection Connection to use
 * @param commitment Desired level of commitment for querying the state
 *
 * @return Amount of lamports required
 */
export async function getMinimumBalanceForRentExemptAccountWithExtensions(connection, extensions, commitment) {
    const accountLen = getAccountLen(extensions);
    return await connection.getMinimumBalanceForRentExemption(accountLen, commitment);
}
function unpackAccount(info, address, programId) {
    if (!info)
        throw new TokenAccountNotFoundError();
    if (!info.owner.equals(programId))
        throw new TokenInvalidAccountOwnerError();
    if (info.data.length < ACCOUNT_SIZE)
        throw new TokenInvalidAccountSizeError();
    const rawAccount = AccountLayout.decode(info.data.slice(0, ACCOUNT_SIZE));
    let tlvData = Buffer.alloc(0);
    if (info.data.length > ACCOUNT_SIZE) {
        if (info.data.length === MULTISIG_SIZE)
            throw new TokenInvalidAccountSizeError();
        if (info.data[ACCOUNT_SIZE] != AccountType.Account)
            throw new TokenInvalidAccountError();
        tlvData = info.data.slice(ACCOUNT_SIZE + ACCOUNT_TYPE_SIZE);
    }
    return {
        address,
        mint: rawAccount.mint,
        owner: rawAccount.owner,
        amount: rawAccount.amount,
        delegate: rawAccount.delegateOption ? rawAccount.delegate : null,
        delegatedAmount: rawAccount.delegatedAmount,
        isInitialized: rawAccount.state !== AccountState.Uninitialized,
        isFrozen: rawAccount.state === AccountState.Frozen,
        isNative: !!rawAccount.isNativeOption,
        rentExemptReserve: rawAccount.isNativeOption ? rawAccount.isNative : null,
        closeAuthority: rawAccount.closeAuthorityOption ? rawAccount.closeAuthority : null,
        tlvData,
    };
}
//# sourceMappingURL=account.js.map