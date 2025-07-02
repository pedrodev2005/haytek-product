import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: Repository<Product>;

  const mockProductArray: Product[] = [
    {
      id: 'uuid1',
      model: 'Canon EF 50mm',
      brand: 'Canon',
      type: 'Prime',
      focalLength: '50mm',
      maxAperture: 'f/1.8',
      mount: 'Canon EF',
      weight: 160,
      hasStabilization: false,
      active: true,
    },
  ];

  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all products', async () => {
    mockRepository.find.mockResolvedValue(mockProductArray);

    const result = await service.findAll();

    expect(result).toEqual(mockProductArray);
    expect(repo.find).toHaveBeenCalledWith({ where: { active: true } });
  });

  it('should return a product by id', async () => {
    const product = mockProductArray[0];
    mockRepository.findOneBy.mockResolvedValue(product);

    const result = await service.findOne(product.id);

    expect(result).toEqual(product);
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: product.id });
  });

  it('should throw NotFoundException if product is not found', async () => {
    mockRepository.findOneBy.mockResolvedValue(undefined);

    await expect(service.findOne('not-exist')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should create and return a product', async () => {
    const dto = {
      model: 'Canon EF 50mm',
      brand: 'Canon',
      type: 'Prime',
      focalLength: '50mm',
      maxAperture: 'f/1.8',
      mount: 'Canon EF',
      weight: 160,
      hasStabilization: false,
    };

    const createdProduct = { id: 'uuid2', ...dto, active: true };

    mockRepository.create.mockReturnValue(createdProduct);
    mockRepository.save.mockResolvedValue(createdProduct);

    const result = await service.create(dto);

    expect(result).toEqual(createdProduct);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(createdProduct);
  });

  it('should update and return a product', async () => {
    const existingProduct = { ...mockProductArray[0] };
    const updateDto = { model: 'Updated Model' };

    jest.spyOn(service, 'findOne').mockResolvedValue(existingProduct);
    mockRepository.save.mockResolvedValue({ ...existingProduct, ...updateDto });

    const result = await service.update(existingProduct.id, updateDto);

    expect(result.model).toBe('Updated Model');
    expect(repo.save).toHaveBeenCalledWith({
      ...existingProduct,
      ...updateDto,
    });
  });

  it('should soft delete a product (set active to false)', async () => {
    const product = { ...mockProductArray[0] };
    const softDeleted = { ...product, active: false };

    jest.spyOn(service, 'findOne').mockResolvedValue(product);
    mockRepository.save.mockResolvedValue(softDeleted);

    const result = await service.remove(product.id);

    expect(result.active).toBe(false);
    expect(repo.save).toHaveBeenCalledWith(softDeleted);
  });
});
