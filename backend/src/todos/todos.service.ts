import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TodosService {
    constructor(@InjectRepository(Todo) private todoRepository: Repository<Todo>) {}

    findAll() {
        return this.todoRepository.find();
    }

    async create(text: string) {
        const newTodo = this.todoRepository.create({text: text, completed: false});
        return this.todoRepository.save(newTodo);
    }

    async toggle(id: number) {
        const todo = await this.todoRepository.findOneBy({id});
        if (!todo) throw new NotFoundException(`Todo with id: ${id} not found`);
        todo.completed = !todo.completed;
        return this.todoRepository.save(todo);
    }

    async remove(id: number) {
        const res = await this.todoRepository.delete({id});
        if (res.affected === 0) throw new NotFoundException(`Todo with id: ${id} not found`);
        return { deleted: true };
    }
}   

