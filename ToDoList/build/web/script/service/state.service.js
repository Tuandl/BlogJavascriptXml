/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Storing Application Data
 * @returns {StateService}
 */
var StateService = function() {
    var SUFFIX_EXPIRED = '_expiredAt';
    
    var stateConst = {
        user: 'USER_DATA',
        toDoTableXsl: 'TODO_TABLE_XSL',
        todoFormXsl: 'TODO_FORM_XSL',
    };
    
    /**
     * remove data in localStorage
     * @param {type} key
     * @returns {undefined}
     */
    function remove(key) {
        localStorage.removeItem(key);
        localStorage.removeItem(key + SUFFIX_EXPIRED);
    }
    
    /**
     * Save data into localStorage with expired date
     * Expired: second
     * Default Expired Date: 24*60*60
     * @param {type} key
     * @param {type} value
     * @param {type} expired
     * @returns {undefined}
     */
    function save(key, value, expired) {
        if(value == null || value == undefined) {
            return;
        }
        
        if(expired == null || expired == undefined) {
            //default is a day
            expired = 24 * 60 * 60;
        }
        expired *= 1000;
        var now = Date.now();
        var expiredAt = now + expired;
        localStorage.setItem(key, value);
        localStorage.setItem(key + SUFFIX_EXPIRED, expiredAt);
    }
    
    /**
     * Get data still valid in local storage
     * @param {type} key
     * @returns {DOMString}
     */
    function get(key){
        var expiredAt = localStorage.getItem(key + SUFFIX_EXPIRED);
        if(expiredAt == null || expiredAt == undefined) {
            return null;
        }
        
        var now = Date.now();
        if(now < expiredAt) {
            //still valid
            var value = localStorage.getItem(key);
            return value;
        } else {
            remove(key);
            return null;
        }
    }
    
    this.getItem = get;
    this.setItem = save;
    this.removeItem = remove;
    this.stateConst = stateConst;
}




























