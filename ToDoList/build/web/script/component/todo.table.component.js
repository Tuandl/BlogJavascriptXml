/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require('XmlService');
require('HttpService');
require('StateService');

var ToDoTableComponent = function() {
    var xmlService = new XmlService();
    var httpService = new HttpService();
    var stateService = new StateService();
    
    var viewNames = {
        button: {
            edit: 'btnEdit',
            delete: 'btnDelete',
        },
    };
    var containerId = null;
    
    function getDataXmlStr() {
        return new Promise(function(resolve, reject) {
            httpService.get(app.url.api.todo).then(function(response) {
                resolve(response);
            }).catch(function(error) {
                console.log(error);
                reject(error);
            })
        });
    }
    
    function getTableXSL() {
        return new Promise(function(resolve, reject) {
            var xsl = stateService.getItem(stateService.stateConst.toDoTableXsl);
            
            if(xsl == null) {
                httpService.get(app.url.xsl.toDoTable).then(function(response) {
                    stateService.setItem(stateService.stateConst.toDoTableXsl, response);
                    resolve(response);
                }).catch(function(error) {
                    console.log(error);
                    reject(error);
                })
            } else {
                resolve(xsl);
            }
        });
    }
    
    function renderTable(divId) {
        var div = document.getElementById(divId);
        if(div == null) return;
        containerId = divId;
        
        var getXmlStrTask = getDataXmlStr();
        var getTableXSLTask = getTableXSL();
        
        //wait for all promise complete
        Promise.all([getXmlStrTask, getTableXSLTask]).then(function(data) {
            var dataXmlStr = data[0];
            var xsl = data[1];
            
            var dataXml = xmlService.parseStringToXml(dataXmlStr);
            var html = xmlService.transformToDocument(dataXml, xsl);
            
            xmlService.removeAllChild(div);
            div.appendChild(html);
            
            bindEventToButtons();
        });
    }
    
    function bindEventToButtons() {
        var editBtns = document.getElementsByName(viewNames.button.edit);
        editBtns.forEach(function(btn) {
            btn.addEventListener('click', onBtnEditClicked);
        });
        
        var deleteBtns = document.getElementsByName(viewNames.button.delete);
        deleteBtns.forEach(function(btn) {
            btn.addEventListener('click', onBtnDeleteClicked);
        });
    }
    
    function onBtnEditClicked(event) {
        var btn = event.srcElement;
        var todoId = app.getIdInDataId(btn);
        
        var param = {
            id: todoId,
        };
        var url = app.makeUrlWithParam(app.url.page.toDoEdit, param);
        window.location.href = url;
    }
    
    function onBtnDeleteClicked(event) {
        var btn = event.srcElement;
        var todoId = app.getIdInDataId(btn);
        var param = {
            id: todoId,
        };
        
        httpService.delete(app.url.api.todo, param).then(function(response) {
            alert('Delete success');
            renderTable(containerId);
        }).catch(function(error) {
            alert('Delete Failed');
        })
    }
    
    this.renderTable = renderTable;
}