import { Entity, Column, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PortfolioEntity } from './portfolio.entity';
import { MarketDataEntity } from './marketData.entity';

@Entity('asset')
export class AssetEntity {
  @PrimaryGeneratedColumn('uuid') // ID único generado automáticamente
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  symbol: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  asset_type?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  market_price?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  sector?: string;

  @Column({ type: 'char', nullable: true })
  info?: string;

  @OneToMany(() => PortfolioEntity, (portfolio) => portfolio)
  portfolios?: PortfolioEntity[];

  @Column()
  RiskProfile?: number

  @OneToMany(() => MarketDataEntity, (marketData) => marketData.asset)
  marketData?: MarketDataEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
