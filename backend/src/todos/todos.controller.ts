import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private todosService: TodosService) {}

    @Get()
    async findAll() {
        return this.todosService.findAll();
    }

    @Post()
    async create(@Body() createTodoDto: CreateTodoDto) {
        return this.todosService.create(createTodoDto.text);
    }

    @Patch(':id')
    async toggle(@Param('id', ParseIntPipe) id: number) {
        return this.todosService.toggle(id);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.todosService.remove(id);
    }
}
