/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package todolist.dao;

import todolist.model.ToDo;

/**
 *
 * @author admin
 */
public class ToDoDAO extends DAOBase<ToDo> implements IDAO<ToDo>{
    public ToDoDAO() {
        super(ToDo.class);
    }
}
