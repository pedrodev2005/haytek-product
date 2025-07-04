import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProduct = {
    id: '1',
    model: 'Canon EF 50mm',
    brand: 'Canon',
    type: 'Prime',
    focalLength: '50mm',
    maxAperture: 'f/1.8',
    mount: 'EF',
    weight: 150,
    hasStabilization: false,
    active: true,
  };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockProduct),
    findAll: jest.fn().mockResolvedValue([mockProduct]),
    findOne: jest.fn().mockResolvedValue(mockProduct),
    update: jest.fn().mockResolvedValue(mockProduct),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const result = await controller.create(mockProduct);
    expect(result).toEqual(mockProduct);
  });

  it('should return all products', async () => {
    const paginationDto = { page: 1, limit: 10 };
    const search = '';
    const type = '';

    const result = await controller.findAll(paginationDto, search, type);
    expect(result).toEqual([mockProduct]);
  });

  it('should return a single product', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual(mockProduct);
  });

  it('should update a product', async () => {
    const result = await controller.update('1', mockProduct);
    expect(result).toEqual(mockProduct);
  });

  it('should delete a product', async () => {
    const result = await controller.remove('1');
    expect(result).toBeUndefined();
  });
});
