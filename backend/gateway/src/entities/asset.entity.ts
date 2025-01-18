import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { PortfolioEntity } from './portfolio.entity';
import { MarketDataEntity } from './marketData.entity';

@Entity('asset')
export class AssetEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  symbol: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  asset_type: string;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  market_price: number;

  @Column({ nullable: true })
  sector?: string;

  @Column({ nullable: true })
  info?: string;

  @OneToMany(() => PortfolioEntity, (portfolio) => portfolio)
  portfolios: PortfolioEntity[];

  @OneToMany(() => MarketDataEntity, (marketData) => marketData.asset)
  marketData: MarketDataEntity[];
}
