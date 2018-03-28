const Base = require('./Base')
const ItemsTypes = require('adex-constants').items.ItemsTypes

class Account extends Base {
    /**
    * NOTE:
    *   - _temp prop will be used for easy development at the moment to keep account data
    *   - _stats will be used only at the client model for easier access to account data from 
    *   smart contracts (balance of rth/adx, register status, approved adx for transfer etc...)        
    */
    constructor({
        fullName,
        _meta,
        _ipfs,
        _addr,
        _hdWalletAddrIdx, // HD wallet addr index
        _hdWalletAddrPath, // HD wallet Path
        _authMode, // TODO: Deprecate
        _chainId, // Blockchain Id
        _signType, // Sing type (Eip, Trezor, personal, etc..)
        _authType, // Auth type (Metamask, Trezor, Ledger) 
        _authSig,
        _nonce,
        _temp,
        _modifiedOn,
        _deleted,
        _archived,
        _stats = { balanceEth: 0, balanceAdx: 0, allowance: 0, isRegistered: false },
        _settings = {} }
        = {}) {

        super({ fullName, _meta, _ipfs, _modifiedOn, _deleted, _archived })
        this._addr = _addr
        this.hdWalletAddrIdx = _hdWalletAddrIdx
        this.hdWalletAddrPath = _hdWalletAddrPath
        this.authMode = _authMode
        this.chainId = _chainId
        this.signType = _signType
        this.authType = _authType
        this.authSig = _authSig
        this._stats = _stats
        this.settings = _settings

        // Temp we will keep here some addr data 
        this._temp = _temp

        return this
    }

    get addr() { return this._addr }
    set addr(value) { this._addr = value }

    get hdWalletAddrIdx() { return this._hdWalletAddrIdx }
    set hdWalletAddrIdx(value) { this._hdWalletAddrIdx = value }

    get hdWalletAddrPath() { return this._hdWalletAddrPath }
    set hdWalletAddrPath(value) { this._hdWalletAddrPath = value }

    get authMode() { return this._authMode }
    set authMode(value) { this._authMode = value }

    get chainId() { return this._chainId }
    set chainId(value) { this._chainId = value }

    get signType() { return this._signType }
    set signType(value) { this._signType = value }

    get authType() { return this._authType }
    set authType(value) { this._authType = value }

    get authSig() { return this._authSig }
    set authSig(value) { this._authSig = value }

    get stats() { return this._stats }
    set stats(value) { this._stats = value }

    // Local settings (dapp)
    get settings() { return this._settings }
    set settings(value) { this._settings = value }

    get temp() { return this._temp }
    set temp(value) { this._temp = value }
}

module.exports = Account
