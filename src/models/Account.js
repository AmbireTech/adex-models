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
        email = '',
        identity = {
            address: '',
            status: 'pending',
            privileges: [{ address: null, level: 0, status: 0 }],
            balanceEth: '0',
            balanceDai: '0'
        },
        wallet = {
            authSig: '', // Signature for adex-market session
            signType: '', // Sing type (Eip, Trezor, personal, etc..)
            authType: '', // Auth type (Metamask, Trezor, Ledger, Local) 
            lsKey: '',
            path: '',  // We are going to keep the entire path instead using path + index
            chainId: null, // need this for hd wallets
            balanceEth: '0',
            balanceDai: '0'
        },
        temp = {},
        // TODO: think on this
        stats = {
            walletAddress: '',
            walletAuthType: '',
            walletPrivilege: '',
            walletBalanceEth: '',
            walletBalanceDai: '',
            identityAddress: '',
            identityBalanceEth: '',
            identityBalanceDai: '',
            identityPrivileges: ''
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
