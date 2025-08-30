import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { useDebugValue } from 'react';

const mockTodosService = {
  findAll: jest.fn(),
  create: jest.fn(),
  toggle: jest.fn(),
  remove: jest.fn(),
}

describe('TodosController', () => {
  let controller: TodosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: mockTodosService,
        }
      ]
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all todos', async () => {
    const todos = [{ id: 1, text: 'test', completed: false }];
    mockTodosService.findAll.mockResolvedValue(todos);

    const result = await controller.findAll();
    expect(result).toEqual(todos);
  });

  it('should add new task to todos', async () => {
    const dto = { text: 'Nowe zadanie' };
    const created = { id: 1, text: 'Nowe zadanie', completed: false };
    
    mockTodosService.create.mockResolvedValue(created);

    const result = await controller.create(dto);
    expect(result).toEqual(created);
  });

  it('should updated completed', async () => {
    const updated = { id: 1, text: 'Test', completed: true };
    mockTodosService.toggle.mockResolvedValue(updated);

    const result = await controller.toggle(1);
    expect(result).toEqual(updated);
  });

  it('should remove task', async () => {
    mockTodosService.remove.mockResolvedValue({ deleted: true });
    
    const result = await controller.remove(1);
    expect(result).toEqual({ deleted: true });
  });
});
