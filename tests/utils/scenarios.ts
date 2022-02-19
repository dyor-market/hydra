
import {Fanout, FanoutClient, MembershipModel} from "@hydra/fanout";
import {createMasterEdition} from "./metaplex";
import {DataV2} from "@metaplex-foundation/mpl-token-metadata";
import {Keypair, PublicKey, TransactionInstruction} from "@solana/web3.js";
import spl, {ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID} from "@solana/spl-token";
type BuiltFanout = {
    fanout: PublicKey;
    name: string,
    fanoutAccountData: Fanout;
    members: NftFanoutMember[]
}
type NftFanoutMember = {
    voucher: PublicKey;
    mint: PublicKey;
    wallet: Keypair;
}
export async function builtNFTFanout(fanoutSdk: FanoutClient, shares: number, numberMembers: number): Promise<BuiltFanout> {
    const name = `Test${Date.now()}`;
    const init = await fanoutSdk.initializeFanout({
        totalShares: shares,
        name,
        membershipModel: MembershipModel.NFT,
    });
    let memberNumber = shares / numberMembers;
    let ixs: TransactionInstruction[] = [];
    let members: NftFanoutMember[] = []
    for (let i = 0; i < numberMembers; i++) {
        const memberWallet = new Keypair();
        const initMetadataData = new DataV2({
            uri: "URI" + i,
            name: "NAME" + i,
            symbol: "SYMBOL" + i,
            sellerFeeBasisPoints: 1000,
            creators: null,
            collection: null,
            uses: null,
        });
        const nft = await createMasterEdition(
            fanoutSdk.connection,
            //@ts-ignore
            fanoutSdk.wallet.payer,
            initMetadataData,
            0
        );
        let tokenAccount = await nft.mint.getOrCreateAssociatedAccountInfo(
           memberWallet.publicKey
        );
        let owner = await nft.mint.getOrCreateAssociatedAccountInfo(
            fanoutSdk.wallet.publicKey
        );
        await nft.mint.transfer(
            owner.address,
            tokenAccount.address,
            //@ts-ignore
            fanoutSdk.wallet.payer,
            [],
            1
        );
        const ix = await fanoutSdk.addMemberNftInstructions({
            fanout: init.fanout,
            fanoutNativeAccount: init.nativeAccount,
            mint: nft.mint.publicKey,
            shares: memberNumber
        })
        members.push({
            voucher: ix.output.membershipAccount,
            mint: nft.mint.publicKey,
            wallet: memberWallet,
        });
        ixs.push(...ix.instructions);
    }
    await fanoutSdk.sendInstructions(ixs, [], fanoutSdk.wallet.publicKey);
    const fanoutAccount = await fanoutSdk.fetch<Fanout>(
        init.fanout,
        Fanout
    );
    return {
        fanout: init.fanout,
        name,
        fanoutAccountData: fanoutAccount,
        members: members,
    };
}