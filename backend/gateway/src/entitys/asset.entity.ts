import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PortfolioEntity } from './portfolio.entity';
import { MarketDataEntity } from './marketData.entity';

@Entity('asset')
export class AssetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10 })
  symbol: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 20 })
  asset_type: string;

  @Column('decimal', { precision: 15, scale: 2 })
  market_price: number;

  @Column({ length: 20, nullable: true })
  sector?: string;

  @Column({ length: 255, nullable: true })
  info?: string;

  @OneToMany(() => PortfolioEntity, (portfolio) => portfolio)
  portfolios: PortfolioEntity[];

  @OneToMany(() => MarketDataEntity, (marketData) => marketData.asset)
  marketData: MarketDataEntity[];
}
