import { Transaction } from './../../transaction/entities/transaction.entity';
import { User } from './../../user/entities/user.entity';
// Таблица (схема) в БД сущности Category 
import { Column, CreateDateColumn, UpdateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn({ name: 'category_id' }) // теперь 'category_id' - будет названа колонка только в БД
    id: number;

    @Column()
    title: string;

    // связь
    @ManyToOne(() => User, (user) => user.categories)
    // объеденить в колонку "user_id"
    @JoinColumn({ name: 'user_id' }) // без этой строчки, колонка называлась бы просто "userid"
    user: User;

    // связь 
    @OneToMany(() => Transaction, (transaction) => transaction.category)
    transactions: Transaction[]

    @CreateDateColumn() // дата - когда был создан
    createdAt: Date;

    @UpdateDateColumn() //когда был обновлен
    updatedAt: Date;
}
