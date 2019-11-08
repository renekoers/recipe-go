class Store{
    /**
     * 
     * @param {String} store Storename
     */
    constructor(storeName){
        this._storeName = storeName;
    };

    /**
     * @returns {String}
     */
    get storeName(){
        return this._storeName;
    };
}

module.exports = Store;