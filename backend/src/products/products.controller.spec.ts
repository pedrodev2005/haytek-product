import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Produtos')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso.' })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de produtos ativos.' })
  async findAll(
    @Query('search') search?: string,
    @Query('type') type?: string,
    @Res() res?: Response,
  ) {
    const { data, total } = await this.productsService.findAll({
      search,
      type,
    });

    if (res) {
      res.setHeader('x-total-count', total);
      return res.status(200).send(data);
    }

    return data; // usado para testes, se não houver @Res
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Produto encontrado.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Produto atualizado.' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Produto desativado (soft delete).',
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
