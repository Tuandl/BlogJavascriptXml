/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require('ToDoFormComponent');

var AddController = function() {
    var todoFormComponent = new ToDoFormComponent();
    
    var viewIds = {
        divForm: 'divForm',
        btnBack: 'btnBack',
    };
    
    todoFormComponent.renderAddNewItem(viewIds.divForm);
    
    var backButton = document.getElementById(viewIds.btnBack);
    backButton.addEventListener('click', onBtnBackClicked);
    
    function onBtnBackClicked () {
        window.location.replace(app.url.page.toDoList);
    }
}