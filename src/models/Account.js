const Base = require('./Base')

// TODO: use typescript
class Account extends Base {
    /**
    * NOTE:
    *   - _temp prop will be used for easy development at the moment to keep account data
    *   - _stats will be used only at the client model for easier access to account data from 
    *   smart contracts (balance of rth/adx, register status, approved adx for transfer etc...)        
    */
    constructor({
        email,
        identity = {
            address: null,
            status: 'pending',
            privileges: [{ address: null, level: 0, status: 0 }],
            balanceEth: '0',
            balanceDai: '0'
        },
        wallet = {
            authSig: null, // Signature for adex-market session
            signType: null, // Sing type (Eip, Trezor, personal, etc..)
            authType: null, // Auth type (Metamask, Trezor, Ledger, Local) 
            lsKey: '',
            path: null,  // We are going to keep the entire path instead using path + index
            hdWalletAddrIdx: null, // TODO: remove
            hdWalletAddrPath: null,  // TODO: remove
            chainId: null, // need this for hd wallets
            balanceEth: '0',
            balanceDai: '0'
        },
        temp,
        // TODO: think on this
        stats = {
            walletAddress: null,
            walletAuthType: null,
            walletPrivilege: null,
            walletBalanceEth: null,
            walletBalanceDai: null,
            identityAddress: null,
            identityBalanceEth: null,
            identityBalanceDai: null,
            identityPrivileges: null
        },
        settings = {}
    } = {}) {
        super()

        this.email = email
        this.identity = identity
        this.wallet = wallet
        this.stats = stats

        // UI settings (gasPrice , etc...)
        this.settings = settings

        // Temp we will keep here some addr data 
        this.temp = temp

        return this
    }
}

module.exports = Account
