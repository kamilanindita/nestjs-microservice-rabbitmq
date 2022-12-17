import { Injectable, HttpException} from '@nestjs/common';
import { BOOKS } from './data-mock/books';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';

@Injectable()
export class BookService {

    private books = BOOKS;
    
    findAll(): Promise<any> {
        return new Promise(resolve => {
            resolve(this.books);
        });
    }

    findOne(id: number): Promise<any>{
        return new Promise(resolve => {
            const book = this.books.find( book => book.id === id);
            if (!book) {
                resolve('Book does not exist!');
            }
            resolve(book);
        });
    }

    create(createBookDTO: CreateBookDTO): Promise<any> {
        return new Promise(resolve => {
            // manual increment
            const lastbook = this.books.slice(-1)[0]
            const id = lastbook.id? Number(lastbook.id)+1 : 1

            const newBookDTO = {
                id: id,
                ...createBookDTO
            }

            this.books.push(newBookDTO);
            resolve(this.books.slice(-1)[0]);
        });
      }

    update(id: number, updateBookDTO: UpdateBookDTO): Promise<any> {
        return new Promise(resolve => {
            //Find index of specific object using findIndex method.    
            const bookIndex = this.books.findIndex((book => book.id == id));
            if (bookIndex === -1) {
                resolve('Book does not exist!');
            }

            //Update object's property.
            this.books[bookIndex].title = updateBookDTO.title
            this.books[bookIndex].description = updateBookDTO.description
            this.books[bookIndex].author = updateBookDTO.author

            resolve(this.books.find( book => book.id === id));
        });
      }

    delete(id: number): Promise<any> {
        return new Promise(resolve => {
            const bookIndex = this.books.findIndex(book => book.id === id);
            if (bookIndex === -1) {
                resolve('Book does not exist!');
            }
            this.books.splice(bookIndex, 1);
            resolve('Book has been deleted');
        });
    }
}
