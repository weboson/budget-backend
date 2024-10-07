import { TransactionService } from './../transaction/transaction.service';
import { NotFoundException, BadRequestException, Injectable } from '@nestjs/common';
//! наш гуард на проверку авторства на манипуляции с transactions или category 
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { CategoryService } from 'src/category/category.service';

// implements - класс и наследует от интерфейса, реализует функционал CanActivate (TypeScript)
@Injectable()
export class AuthorGuard implements CanActivate { // CanActivate - встроенный интерфейс с методом "canActivate" - функция переключения (true/false)
    
    // получим доступ к service-ам: category и transaction
    constructor(
        private readonly transactionService: TransactionService,
        private readonly categoryService: CategoryService,
    ) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // CanActivate нам дает еще метод для получения request (отклик)
        const request = context.switchToHttp().getRequest() // получили полный request (отклик)
        const { id, type } = request.params // где есть url-params: (:id и :type)

        let entity;

        // переключатель (JS)
        // url/'transactions' or 'categories'/'transaction' or 'category'/id
        switch (type) { // в зависимости от :type = 'transactions' or 'category'
            case 'transaction': 
            // получим сущность (весь объект с id, title и со связами user, category/transaction)  по текущему id (url-params)
                entity = await this.transactionService.findOne(id)  // url/transactions/transaction/4           
                break;
            case 'category':
            // получим сущность по текущему id (url-params)
                entity = await this.categoryService.findOne(id)  // url/categories/category/4           
                break;
            default:
                throw new NotFoundException('Something went wrong...')
        }

        // получим true если user авторизован
        const user = request.user // который возвращает @UseGuards(JwtAuthGuard)

        // entity - сущность существует, user - пользователь автоизирован
        //! и если user.id из JWT совпадает === с user.id из связи category/transaction
        if(entity && user && entity.user.id === user.id) {
            return true
        }

        throw new BadRequestException('Something went wrong...');
    }
}