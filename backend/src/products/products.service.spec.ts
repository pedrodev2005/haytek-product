import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockProduct = {
  id: '1',
  model: 'Canon 50mm',
  brand: 'Canon',
  type: 'Prime',
  focalLength: '50mm',
  maxAperture: 'f/1.8',
  mount: 'EF',
  weight: 160,
  hasStabilization: false,
  active: true,
};

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: Repository<Product>;

  const mockRepo = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockResolvedValue(mockProduct),
    findAndCount: jest.fn().mockResolvedValue([[mockProduct], 1]),
    findOneBy: jest.fn().mockResolvedValue(mockProduct),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const dto = { ...mockProduct };
    expect(await service.create(dto)).toEqual(mockProduct);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalled();
  });

  it('should find all products with pagination', async () => {
    const result = await service.findAll({ page: 1, limit: 10 });
    expect(result.data).toEqual([mockProduct]);
    expect(result.total).toBe(1);
    expect(result.page).toBe(1);
    expect(result.limit).toBe(10);
    expect(result.totalPages).toBe(1);
  });

  it('should find one product', async () => {
    expect(await service.findOne('1')).toEqual(mockProduct);
  });

  it('should throw NotFoundException if product not found or inactive', async () => {
    jest.spyOn(repo, 'findOneBy').mockResolvedValueOnce(null);
    await expect(service.findOne('invalid')).rejects.toThrow(NotFoundException);
  });

  it('should update a product', async () => {
    const updated = { ...mockProduct, model: 'Updated' };
    jest.spyOn(repo, 'save').mockResolvedValueOnce(updated);
    expect(await service.update('1', { model: 'Updated' } as any)).toEqual(
      updated,
    );
  });

  it('should soft delete a product', async () => {
    const deleted = { ...mockProduct, active: false };
    jest.spyOn(repo, 'save').mockResolvedValueOnce(deleted);
    expect(await service.remove('1')).toEqual(deleted);
  });
});
