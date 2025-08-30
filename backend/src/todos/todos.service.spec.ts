import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './todo.entity';

const mockTodoRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
}

describe('TodosService', () => {
    let service: TodosService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TodosService,
                {
                    provide: getRepositoryToken(Todo),
                    useValue: mockTodoRepository,
                },
            ],
        }).compile();

        service = module.get<TodosService>(TodosService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return all todos', async () => {
        const todos = [{ id: 1, text: 'Test', completed: false }];
        mockTodoRepository.find.mockResolvedValue(todos);

        const result = await service.findAll();
        expect(result).toEqual(todos);
    });

    it('should reate a new todo', async () => {
        const todo = { id: 1, text: 'Nowe zadanie', completed: false };
        mockTodoRepository.create.mockReturnValue(todo);
        mockTodoRepository.save.mockResolvedValue(todo);

        const result = await service.create('Nowe zadanie');
        expect(result).toEqual(todo);
    });

    it('should toggle completed status of todo', async () => {
        const todo = { id: 1, text: 'Test', completed: false };
        mockTodoRepository.findOneBy.mockResolvedValue(todo);
        mockTodoRepository.save.mockResolvedValue({ ...todo, completed: true });

        const result = await service.toggle(1);
        
        expect(mockTodoRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
        expect(result.completed).toBe(true);
    });

    it('should throw NotFoundException if todo not found', async () => {
        mockTodoRepository.findOneBy.mockResolvedValue(null);
        await expect(service.toggle(999)).rejects.toThrow(NotFoundException);
    });

    it('should remove a todo', async () => {
        mockTodoRepository.delete.mockResolvedValue({ affected: 1 });

        const result = await service.remove(1);

        expect(mockTodoRepository.delete).toHaveBeenCalledWith({ id: 1 });
        expect(result).toEqual({ deleted: true });
    });

    it('should throw NotFoundException if todo not found', async () => {
        mockTodoRepository.delete.mockResolvedValue({ affected: 0 });

        await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
});
