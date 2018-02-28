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
        _authMode,
        _authSig,
        _temp,
        _modifiedOn,
        _deleted,
        _archived,
        _stats = { balanceEth: 0, balanceAdx: 0, allowance: 0, isRegistered: false },
        _settings = {} }
        = {}) {

        super({ fullName, _meta, _ipfs, _modifiedOn, _deleted, _archived })
        this._addr = _addr
        this._stats = _stats
        this.settings = _settings
        this.authMode = _authMode
        this.authSig = _authSig

        // Temp we will keep here some addr data 
        this._temp = _temp

        return this
    }

    get addr() { return this._addr }
    set addr(value) { this._addr = value }

    get authMode() { return this._authMode }
    set authMode(value) { this._authMode = value }

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
