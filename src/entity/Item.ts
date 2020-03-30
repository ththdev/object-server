import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    OneToMany,
    ManyToOne
} from 'typeorm'
import ItemImage from './ItemImage'
import Collection from './Collection'

@Entity()
export default class Item extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    brand: string

    @OneToMany(type => ItemImage, itemImage => itemImage.parentItem)
    imageUrls: ItemImage[]

    @ManyToOne(type => Collection, collection => collection.items)
    parentCollection: Collection

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date
}