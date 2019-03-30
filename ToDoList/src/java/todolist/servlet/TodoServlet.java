/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package todolist.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import todolist.dao.ToDoDAO;
import todolist.dto.ToDoDTO;
import todolist.dto.TodosDTO;
import todolist.model.ToDo;
import todolist.utils.StringUtils;
import todolist.utils.XMLUtils;

/**
 *
 * @author admin
 */
@WebServlet(name = "TodoServlet", urlPatterns = {"/ToDo"})
public class TodoServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        ToDoDAO dao = new ToDoDAO();
        try {
            String idStr = req.getParameter("id");
            if(idStr == null) {
                //get all to do list
                List<ToDo> todos = dao.getAll();
                List<ToDoDTO> todoDtos = todos.stream()
                        .map((x) -> new ToDoDTO(x))
                        .collect(Collectors.toList());
                TodosDTO dto = new TodosDTO();
                dto.setToDos(todoDtos);
                
                XMLUtils.marshallToOutputStream(dto, resp.getOutputStream());
                resp.setStatus(HttpServletResponse.SC_OK);
            }
            else {
                //get by id
                Integer id = StringUtils.parseStringToInt(idStr);
                if(id == null) {
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    return;
                }
                
                ToDo todo = dao.getById(id);
                ToDoDTO dto = new ToDoDTO(todo);
                if(todo != null) {
                    XMLUtils.marshallToOutputStream(dto, resp.getOutputStream());
                    resp.setStatus(HttpServletResponse.SC_OK);
                } else {
                    resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        ToDoDAO dao = new ToDoDAO();
        try {
            String data = req.getParameter("data");
            if(data == null) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return;
            }
            
            ToDoDTO dto = (ToDoDTO)XMLUtils.unmarshallFromString(ToDoDTO.class, data);
            if(dto == null) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return;
            }
            
            ToDo entity = new ToDo(dto);
            boolean isInserted = dao.insert(entity);
            if(isInserted) {
                resp.setStatus(HttpServletResponse.SC_OK);
            } else {
                resp.setStatus(HttpServletResponse.SC_NOT_ACCEPTABLE);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        ToDoDAO dao = new ToDoDAO();
        try {
            String data = StringUtils.readStringFromInputStream(req.getInputStream());
            if(data == null) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return;
            }
            
            ToDoDTO dto = (ToDoDTO)XMLUtils.unmarshallFromString(ToDoDTO.class, data);
            if(dto == null) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return;
            }
            
            ToDo entity = new ToDo(dto);
            ToDo oldEntity = dao.getById(entity.getId());
            entity.setCreatedAt(oldEntity.getCreatedAt());
            
            boolean isUpdated = dao.update(entity);
            if(isUpdated) {
                resp.setStatus(HttpServletResponse.SC_OK);
            } else {
                resp.setStatus(HttpServletResponse.SC_NOT_ACCEPTABLE);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        ToDoDAO dao = new ToDoDAO();
        try {
            String idStr = req.getParameter("id");
            if(idStr == null) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return;
            }
            
            Integer id = StringUtils.parseStringToInt(idStr);
            if(id == null) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return;
            }
            
            boolean isDeleted = dao.delete(id);
            if(isDeleted) {
                resp.setStatus(HttpServletResponse.SC_OK);
            } else {
                resp.setStatus(HttpServletResponse.SC_NOT_ACCEPTABLE);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    
}























