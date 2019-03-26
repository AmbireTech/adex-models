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
            privileges: [{ address: null, level: 0 }],
            balanceEth: '0',
            balanceDai: '0'
        },
        wallet = {
            signType, // Sing type (Eip, Trezor, personal, etc..)
            authType, // Auth type (Metamask, Trezor, Ledger, Local) 
            lsKey: '',
            hdWalletAddrIdx,
            hdWalletAddrPath,
            chainId, // need this for hd wallets
            balanceEth: '0',
            balanceDai: '0'
        },
        temp,
        // TODO: think on this
        stats = {
            walletAddress,
            walletAuthType,
            walletPrivilege,
            walletBalanceEth,
            walletBalanceDai,
            identityAddress,
            identityBalanceEth,
            identityBalanceDai,
            identityPrivileges
        } }) {

        this.email = email
        this.identity = identity
        this.wallet = wallet
        this.stats = stats
        this.settings = settings

        // Temp we will keep here some addr data 
        this.temp = temp

        return this
    }

    get email() { return this._email }
    set email(value) { this._email = value }

    get identity() { return this._identity }
    set identity(value) { this._identity = value }

    get wallet() { return this._wallet }
    set wallet(value) { this._wallet = value }

    get stats() { return this._stats }
    set stats(value) { this._stats = value }

    // Local settings (dapp)
    get settings() { return this._settings }
    set settings(value) { this._settings = value }

    get temp() { return this._temp }
    set temp(value) { this._temp = value }
}

module.exports = Account
