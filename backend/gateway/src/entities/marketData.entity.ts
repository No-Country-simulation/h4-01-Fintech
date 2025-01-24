import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AssetEntity } from './asset.entity';

@Entity('marketData')
export class MarketDataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @ManyToOne(() => AssetEntity, (asset) => asset.marketData)
  @JoinColumn({ name: 'asset_id' }) // Asegúrate de que el nombre coincida con el de la base de datos
  asset: AssetEntity;

  @Column('float')
  price: number;

  @Column('timestamp')
  timestamp: Date;
}
