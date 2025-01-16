import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AssetEntity } from './asset.entity';

@Entity('marketData')
export class MarketData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AssetEntity, (asset) => asset.marketData)
  asset: AssetEntity;

  @Column('decimal', { precision: 15, scale: 2 })
  price: number;

  @Column()
  timestamp: Date;
}
