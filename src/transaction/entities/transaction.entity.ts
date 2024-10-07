import { Category } from 'src/category/entities/category.entity';
//! Таблица для БД, сущности Transaction (доход/расход) - создалась таблица в БД
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn({ name: 'transaction_id' })
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true }) // позволенное значение, т.е. может быть null 
    type: string; // тип: доход или расход

    // связь: привязать к текущему пользователю
    @ManyToOne(() => User, (user) => user.transactions)
    @JoinColumn({ name: 'user_id' }) // объединить  в колонку "user_id"
    user: User;

    // связь: привязать к текущей категории + если удалить привязанную категорию, то ей назначается NULL
    @ManyToOne(() => Category, (category) => category.transactions, {
        onDelete: 'SET NULL'
    })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @Column()
    amount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
