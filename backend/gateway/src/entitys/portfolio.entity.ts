import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AssetEntity } from './asset.entity';

@Entity()
export class PortfolioEntity {
  @PrimaryGeneratedColumn()
  portfolio_id: number;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => AssetEntity, (asset) => asset.portfolios)
  asset: AssetEntity;

  @Column('decimal', { precision: 10, scale: 4 })
  quantity: number;

  @Column('decimal', { precision: 15, scale: 2 })
  avg_buy_price: number;

  @Column({ type: 'uuid', nullable: true })
  objective_id?: number;

  @Column({ nullable: true })
  current_price?: number;
}
