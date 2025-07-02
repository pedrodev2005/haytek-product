import { IsString, IsInt, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Nikon NIKKOR Z 24-70mm f/2.8 S' })
  @IsString()
  model: string;

  @ApiProperty({ example: 'Nikon' })
  @IsString()
  brand: string;

  @ApiProperty({ example: 'Zoom' })
  @IsString()
  type: string;

  @ApiProperty({ example: '24-70mm' })
  @IsString()
  focalLength: string;

  @ApiProperty({ example: 'f/2.8' })
  @IsString()
  maxAperture: string;

  @ApiProperty({ example: 'Nikon Z Mount' })
  @IsString()
  mount: string;

  @ApiProperty({ example: 805 })
  @IsInt()
  weight: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  hasStabilization: boolean;
}
