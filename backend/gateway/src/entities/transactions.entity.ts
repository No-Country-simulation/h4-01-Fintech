import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { AssetEntity } from './asset.entity';
import { TypeTrans } from './enum/typeTransaction';
import { UserEntity } from './user.entity';

@Entity('transaction')
@Index(['timestamp']) 
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.transaction)
  user: UserEntity;

  @ManyToOne(() => AssetEntity, (asset) => asset.marketData)
  asset: AssetEntity;

  @Column('decimal', { precision: 10, scale: 4 })
  quantity: number;

  @Column('decimal', { precision: 15, scale: 2 })
  price: number;

  @Column({ type: 'enum', enum: TypeTrans })
  transaction_type: TypeTrans;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ length: 255 })
  location: string;
}
