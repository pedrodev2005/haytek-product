import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  model: string;

  @Column()
  brand: string;

  @Column()
  type: string;

  @Column()
  focalLength: string;

  @Column()
  maxAperture: string;

  @Column()
  mount: string;

  @Column('int')
  weight: number;

  @Column({ default: false })
  hasStabilization: boolean;

  @Column({ default: true })
  active: boolean;
}
