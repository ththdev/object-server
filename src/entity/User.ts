import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
} from 'typeorm'

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    gender!: string

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date
}