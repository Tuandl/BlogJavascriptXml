create database ToDoList

create table ToDo (
	id int primary key identity(1,1),
	deleted bit,
	createdAt datetime,
	updatedAt datetime null,
	title nvarchar(max),
	description nvarchar(max),
	done bit,
)
