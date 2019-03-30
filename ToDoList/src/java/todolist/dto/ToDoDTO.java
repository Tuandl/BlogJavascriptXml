/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package todolist.dto;

import java.text.SimpleDateFormat;
import java.util.Date;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import todolist.model.ToDo;

/**
 *
 * @author admin
 */

@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "todo")
public class ToDoDTO {
    private int id;
    private Date createdAt;
    private String createdAtString;
    private Date updatedAt;
    private String title;
    private String description;
    private boolean done;

    public ToDoDTO() {}
    
    public ToDoDTO(ToDo entity) {
        id = entity.getId();
        createdAt = entity.getCreatedAt();
        updatedAt = entity.getUpdatedAt();
        title = entity.getTitle();
        description = entity.getDescription();
        done = entity.isDone();
        
        if(createdAt != null) {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
            createdAtString = simpleDateFormat.format(createdAt);
        }
    }
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
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

    public String getCreatedAtString() {
        return createdAtString;
    }

    public void setCreatedAtString(String createdAtString) {
        this.createdAtString = createdAtString;
    }

    
}
