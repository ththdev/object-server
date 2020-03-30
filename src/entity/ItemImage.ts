import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    ManyToOne
} from 'typeorm'
import Item from './Item'

@Entity()
export default class ItemImage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @ManyToOne(type => Item, item => item.imageUrls)
    parentItem: Item[]

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date
}