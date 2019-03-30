/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package todolist.model;

import todolist.dto.ToDoDTO;

/**
 *
 * @author admin
 */
public class ToDo extends ModelBase {
    private String title;
    private String description;
    private boolean done;

    public ToDo() {};
    
    public ToDo(ToDoDTO dto) {
        id = dto.getId();
        createdAt = dto.getCreatedAt();
        updatedAt = dto.getUpdatedAt();
        title = dto.getTitle();
        description = dto.getDescription();
        done = dto.isDone();
    }
    
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }
    
    
}
