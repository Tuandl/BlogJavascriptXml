/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package todolist.dto;

import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "todos")
public class TodosDTO {
    @XmlElement(name = "todo")
    private List<ToDoDTO> toDos;

    public List<ToDoDTO> getToDos() {
        return toDos;
    }

    public void setToDos(List<ToDoDTO> toDos) {
        this.toDos = toDos;
    }
    
    
}
