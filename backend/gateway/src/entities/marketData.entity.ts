import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AssetEntity } from './asset.entity';

@Entity('marketData')
export class MarketDataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AssetEntity, (asset) => asset.marketData, {
    nullable: false,
  })
  @JoinColumn({ name: 'asset_id' })
  asset: AssetEntity;

  @Column('decimal', { precision: 15, scale: 2 })
  price: number;

  @Column()
  timestamp: Date;
}
