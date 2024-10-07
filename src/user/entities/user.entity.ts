import { Transaction } from './../../transaction/entities/transaction.entity';
//! Таблица (схема) для БД, сущности user
import { Category } from "src/category/entities/category.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn() // декоратор автоматически сгенерирует значение для поля id
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;
// связь с category
// связь 1 ко многим: 1 user имеет много categories 
// в аругментах: привязка к Category, к какой именно колонке?
// onDelete: ... - если user будет удален, то его категории тоже будут удалены
    @OneToMany(() => Category, (category) => category.user, { onDelete: 'CASCADE'})
    categories: Category[]; // категория имеет тип "массив Category" (возможность TypeORM)
// при @OneToMany - поле 'categories' (и другие) в БД (DBeaver) почему-то неотображаются: написал коммент под видео: https://youtu.be/iqdMcTN9qck?list=PLkUJHNMBzmtQj5qvTCqn0uMXFDG4ENiwf

// связь с transaction
    @OneToMany(() => Transaction, (transaction) => transaction.user, { onDelete: 'CASCADE'})
    transactions: Transaction[] // связь с transaction

    @CreateDateColumn() // дата - когда был создан
    createdAt: Date;

    @UpdateDateColumn() //когда был обновлен
    updatedAt: Date;

    
}
