import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    OneToMany,
    ManyToOne
} from 'typeorm'
import User from './User'

@Entity()
export default class Item extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    name!: string

    @Column()
    price: number

    @Column()
    brand: string

    @Column("simple-array", { nullable: true })
    imageUrls: string[]

    @Column("uuid")
    creator_id!: string

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date
}