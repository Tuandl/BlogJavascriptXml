/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Core function of application
 * @returns {App}
 */
var App = function () {
    var rootUrl = 'http://localhost:8080/';
    
    /**
     * Define Common Enum in
     * @type Object
     */
    var url = {
        api: {
            todo: 'ToDo'
        },
        page: {
            toDoList: 'view/index.jsp',
            toDoEdit: 'view/edit.jsp',
            toDoAdd: 'view/add.jsp',
        },
        xsl: {
            toDoTable: 'xsl/todo.table.xsl',
            toDoForm: 'xsl/todo.form.xsl',
        },
    };
    
    /**
     * Define module for dynamic loading
     * @type Array
     */
    var modules = [
        {
            name: 'App',
            isLoaded: true,
            url: 'script/app.js'
        }, {
            name: 'HttpService',
            url: 'script/service/http.service.js'
        }, {
            name: 'XmlService',
            url: 'script/service/xml.service.js',
        }, {
            name: 'StateService',
            url: 'script/service/state.service.js',
        }, {
            name: 'ToDoTableComponent',
            url: 'script/component/todo.table.component.js',
        }, {
            name: 'ToDoFormComponent',
            url: 'script/component/todo.form.component.js',
        }
    ];
    
    function getRealUrl(url) {
        return rootUrl + url;
    };
    
    function concatRootUrl(obj) {
        if(typeof obj == 'string') {
            return getRealUrl(obj);
        }
        
        if(Array.isArray(obj)) {
            var arrayResult = [];
            obj.forEach(function(item) {
                var newItem = concatRootUrl(item);
                arrayResult.push(newItem);
            });
            return arrayResult;
        }
        
        var result = {};
        Object.keys(obj).forEach(function(key) {
            var value = obj[key];
            var newValue = concatRootUrl(value);
            result[key] = newValue;
        });
        
        return result;
    }
    
    url = concatRootUrl(url);
    
    modules.forEach(function(module) {
        if(module.url) {
            module.url = getRealUrl(module.url);
        }
    });
    
    function addClass(id, className) {
        var element = document.getElementById(id);
        if(!element.classList.contains(className)) {
            element.classList.add(className);
        }
    }
    
    function removeClass(id, className) {
        var element = document.getElementById(id);
        if(element.classList.contains(className)) {
            element.classList.remove(className);
        }
    }
    
    function showElement(id){
        removeClass(id, 'hidden');
    }
    
    function hideElement(id) {
        addClass(id, 'hidden');
    }
    
    /**
     * Add class hidden to all element has id in errorIdsObj
     * @param {type} errorIdsObj
     * @returns {undefined}
     */
    function resetForm(errorIdsObj) {
        if(errorIdsObj != null && typeof errorIdsObj == 'object') {
            Object.keys(errorIdsObj).forEach(function(key) {
                var id = errorIdsObj[key];
                addClass(id, 'hidden');
            });
        }
    }
    
    function makeUrlWithParam(url, params) {
        var urlWithParam = url;
        if(params != null && params != undefined && typeof params == 'object') {
            urlWithParam += '?' + Object.keys(params).map(function(key) {
                var value = params[key];
                return key + '=' + value;
            }).join('&');
        }
        return urlWithParam;
    }
    
    function getParameter(name) {
        var currentUrlStr = window.location.href;
        var url = new URL(currentUrlStr);
        var result = url.searchParams.get(name);
        return result;
    }
    
    function getAttributeValue(node, attName) {
        var attributes = node.attributes;
        for(var i = 0; i < attributes.length; i++) {
            var att = attributes.item(i);
            if(att.name == attName) {
                return att.value;
            }
        }
    }
    
    function getIdInDataId(node) {
        var result = getAttributeValue(node, 'data-id');
        return result;
    }
    
    /***
     * Dynamic Load Module
     * @param {type} moduleName
     * @returns {undefined}
     */
    function require(moduleName) {
        var module = modules.find(function(entity) {
            return entity.name == moduleName;
        });
        if(!module) {
            console.error('Cannot find module ' + moduleName);
            return undefined;
        }
        
        if(!module.isLoaded) {
            loadModuleSync(module.url);
            module.isLoaded = true;
        }
    }
    
    /***
     * Add <script></script> tag into <head></head> to load script synchronously
     * @param {type} url
     * @returns {undefined}
     */
    function loadModuleSync(url) {
        var head = document.head;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        
        script.async = false;
        
        head.appendChild(script);
    }
    
    this.url = url;
    this.require = require;
    this.resetForm = resetForm;
    this.showElement = showElement;
    this.hideElement = hideElement;
    this.makeUrlWithParam = makeUrlWithParam;
    this.getParameter = getParameter;
    this.getIdInDataId = getIdInDataId;
};

var app = new App();

/**
 * Dynamic load module
 * @param {type} moduleName
 * @returns {undefined}
 */
function require(moduleName) {
    app.require(moduleName);
}




































