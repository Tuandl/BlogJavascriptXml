/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require('XmlService')
require('StateService')
require('HttpService')

var ToDoFormComponent = function() {
    var xmlService = new XmlService();
    var stateService = new StateService();
    var httpService = new HttpService();
    
    var todoId = 0;
    
    var viewIds = {
        text: {
            title: 'txtTitle',
            description: 'txtDescription',
        },
        checkBox: {
            done: 'cbIsDone',
        },
        button: {
            submit: 'btnSubmit',
        },
        error: {
            requireTitle: 'errorRequireTitle',
        },
    };
    
    function getToDoFormXsl() {
        return new Promise(function(resolve, reject) {
            var xsl = stateService.getItem(stateService.stateConst.todoFormXsl);
            
            if(xsl == null) {
                httpService.get(app.url.xsl.toDoForm).then(function(response) {
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
    
    function getDataXmlStr(id) {
        return new Promise(function(resolve, reject) {
            var params = {
                id: id,
            };
            httpService.get(app.url.api.todo, params).then(function(response) {
                resolve(response);
            }).catch(function(error) {
                console.log(error);
                reject(error);
            });
        })
    }
    
    function renderAddNewItem(divId) {
        var div = document.getElementById(divId);
        if(div == null) return;
        
        getToDoFormXsl().then(function(xsl) {
            var tmpXml = xmlService.marshalling({}, 'tmp');
            
            var html = xmlService.transformToDocument(tmpXml, xsl);
            var btnSubmit = html.getElementById(viewIds.button.submit);
            btnSubmit.addEventListener('click', onBtnAddClicked);
            
            xmlService.removeAllChild(div);
            div.appendChild(html);
        });
    }
    
    function renderEditItem(divId, id) {
        var div = document.getElementById(divId);
        if(div == null) return;
        todoId = id;
        
        var getXslTask = getToDoFormXsl()
        var getXmlStrTask = getDataXmlStr(id);
        
        Promise.all([getXslTask, getXmlStrTask]).then(function(data) {
            var xsl = data[0];
            var xmlStr = data[1];
            var xml = xmlService.parseStringToXml(xmlStr)

            var html = xmlService.transformToDocument(xml, xsl);
            var btnSubmit = html.getElementById(viewIds.button.submit);
            btnSubmit.addEventListener('click', onBtnEditClicked);
            
            xmlService.removeAllChild(div);
            div.appendChild(html);
            
        });
    }
    
    function onBtnAddClicked() {
        if(validateForm()) {
            var toDoEntity = getFormData();
            var toDoXml = xmlService.marshalling(toDoEntity, 'todo');
            var todoXmlStr = xmlService.parseXmlToString(toDoXml);
            
            var data = {
                data: todoXmlStr,
            }
            httpService.post(app.url.api.todo, data).then(function() {
                alert('Insert Success');
            }).catch(function(error) {
                alert('Insert Failed');
                console.log(error);
            })
        } 
    }
    
    function onBtnEditClicked() {
        if(validateForm()) {
            var toDoEntity = getFormData();
            var toDoXml = xmlService.marshalling(toDoEntity, 'todo');
            var todoXmlStr = xmlService.parseXmlToString(toDoXml);
            
            httpService.put(app.url.api.todo, todoXmlStr).then(function() {
                alert('Update Success');
            }).catch(function(error) {
                alert('Update Failed');
                console.log(error);
            })
        } 
    }
    
    function validateForm() {
        app.resetForm(viewIds.error);
        
        var data = getFormData();
        if(data.title.length == 0) {
            app.showElement(viewIds.error.requireTitle);
            return false;
        }
        
        return true;
    }
    
    function getFormData() {
        var data = {
            id: todoId,
        };
        
        var titleElement = document.getElementById(viewIds.text.title);
        data.title = titleElement.value;
        
        var descriptionElement = document.getElementById(viewIds.text.description);
        data.description = descriptionElement.value;
        
        var isDoneElement = document.getElementById(viewIds.checkBox.done);
        if(isDoneElement.checked) {
            data.done = 'true';
        } else {
            data.done = 'false';
        }
        
        return data;
    }
    
    this.renderAddNewItem = renderAddNewItem;
    this.renderEditItem = renderEditItem;
}