// src/products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// Interface para resposta paginada
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(createProductDto);
    return await this.productRepo.save(product);
  }

  async findAll({
    page = 1,
    limit = 5,
    search,
    type,
  }: {
    page: number;
    limit: number;
    search?: string;
    type?: string;
  }): Promise<PaginatedResponse<Product>> {
    const validPage = Math.max(1, page);
    const validLimit = Math.max(1, Math.min(100, limit));
    const offset = (validPage - 1) * validLimit;

    // Filtros dinâmicos
    const where: any = { active: true };

    if (search) {
      where.model = ILike(`%${search}%`);
    }

    if (type) {
      where.type = type;
    }

    const [products, total] = await this.productRepo.findAndCount({
      where,
      take: validLimit,
      skip: offset,
      order: { id: 'DESC' },
    });

    const totalPages = Math.ceil(total / validLimit);
    const hasNext = validPage < totalPages;
    const hasPrev = validPage > 1;

    return {
      data: products,
      total,
      page: validPage,
      limit: validLimit,
      totalPages,
      hasNext,
      hasPrev,
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepo.findOneBy({ id });
    if (!product || !product.active) {
      throw new NotFoundException('Produto não encontrado');
    }
    return product;
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, dto);
    return await this.productRepo.save(product);
  }

  async remove(id: string): Promise<Product> {
    const product = await this.findOne(id);
    product.active = false;
    return await this.productRepo.save(product);
  }
}
