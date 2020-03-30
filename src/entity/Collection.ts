import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    OneToMany
} from 'typeorm'
import Item from './Item'

@Entity()
export default class Collection extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(type => Item, item => item.parentCollection)
    items: Item[]

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date
}