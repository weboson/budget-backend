import { Category } from 'src/category/entities/category.entity'; // схема (таблица) для БД
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    // инъекция таблицы (схемы) user 
    @InjectRepository(Category)
    private readonly categotyRepository: Repository<Category>, // пример дженерика Array<number> = [1,2,3]
  ) {}

  //! POST (создать) 
  async create(createCategoryDto: CreateCategoryDto, id: number) { // id для идентификации определенной категории
    // убедится, что нет совпадений входной категории с уже существующей в БД
    // есть ли у этого user-a (id) такая категория?
    const isExist = await this.categotyRepository.findBy({ // найти по полю:
      user: {id: id}, // проверить, есть ли в БД user с таким же id, который мы передаем
      title: createCategoryDto.title // и также есть ли совпадение с полем title входящего и находящего в БД
    })

    // и если isExist (ожидается массив) что-то содержит, то выбросить ошибку с сообщением "Такая катгория уже существует"
    if(isExist.length) throw new BadRequestException('This category already exist!');
    // иначе сохранить в БД входящую категорию
    const newCategory = {
      title: createCategoryDto.title,
      user: {
        id,
      }
    }

    return await this.categotyRepository.save(newCategory); // сохранить объект новой категории
  }



  //! GET (получить все категории относящиеся к текущему user-у) 
  async findAll( id: number ) {
    return await this.categotyRepository.find({
      where: {
        user: {id: id},
      },
      relations: { // связать с транзакциями (в category.entity.ts связь установлена)
        transactions: true
      }
    });
  }

  //! GET(:id) получить одну категорию по "category_id"
  async findOne(id: number) { // id берется из URL-params (31): localhost:3000/categories/31
    const category = await this.categotyRepository.findOne({
      where: { id: id }, // поле из БД "id" === из url "id"
      relations: {
        user: true, // подтягивать данные из user
        transactions: true, // также и тарнзакции
      }
    })

    if(!category) throw new NotFoundException('Category not found')

    return category;
  }

//! Patch(:id)
  async update(id: number, updateCategoryDto: UpdateCategoryDto) { // id (url params), @Body() новые данные
    // найти совпадение в категориях по id (url) в БД
    const category = await this.categotyRepository.findOne({
      where: { id: id }
    }) 

    // если нет совпадений (не найдено)
    if(!category) throw new NotFoundException('Category not found!')
    // если найдено совпадение, то обновить
    return await this.categotyRepository.update(id, updateCategoryDto); // найди по id, и замени новыми данными
  }


  //! @Delete(':id') - удалить определенную категорию по id (url params)
  async remove(id: number) {
// проврека на наличие
  const category = await this.categotyRepository.findOne({
    where: { id: id }
  }) 
  if(!category) throw new NotFoundException('Category not found!')

    return await this.categotyRepository.delete(id); // найди по id, и удалить;
  }
}
