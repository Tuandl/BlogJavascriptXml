/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require('ToDoTableComponent');

var IndexController = function() {
    var toDoTableComponent = new ToDoTableComponent();
    
    var viewIds = {
        btnAdd: 'btnAdd',
        divTable: 'divToDoListTable',
    };
    
    toDoTableComponent.renderTable(viewIds.divTable);
    
    var btnAdd = document.getElementById(viewIds.btnAdd);
    btnAdd.addEventListener('click', onBtnAddClicked);
    
    function onBtnAddClicked() {
        window.location.href = app.url.page.toDoAdd;
    }
}