import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { AssetEntity } from './asset.entity';

@Entity('portfolio')
export class PortfolioEntity {
  @PrimaryGeneratedColumn()
  portfolio_id: number;

  @Column('uuid')
  userId: string;

  @ManyToMany(() => AssetEntity, (asset) => asset.portfolios)
  asset: AssetEntity;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  avg_buy_price: number;

  @Column({ type: 'uuid', nullable: true })
  objective_id?: number;

  @Column('decimal', { precision: 10, scale: 2 })
  current_price: number;
}
