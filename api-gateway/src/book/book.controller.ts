import { Controller, Inject, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';
import { PayloadBookService } from './payload-book-service.interface';

@Controller('book')
export class BookController {
    constructor(
        @Inject('BOOK_SERVICE') private client: ClientProxy
    ){}

    @Get()
    getBooks(): any {
        return this.client.send({ cmd:'getBooks'}, '')
    }

    @Get(':id')
    getBookById(@Param('id') id: number): any {
        const payload: PayloadBookService = {
            id: id,
            book: null
        }
        return this.client.send({ cmd:'getBookById'}, payload)
    }

    @Post()
    createBook(@Body() createBookDTO: CreateBookDTO): any {
        const payload: PayloadBookService = {
            id: null,
            book: createBookDTO
        }
        return this.client.send({ cmd:'createBook'}, payload)
    }

    @Put(':id')
    updateBook(@Param('id') id: number, @Body() updateBookDTO: UpdateBookDTO): any {
        const payload: PayloadBookService = {
            id: id,
            book: updateBookDTO
        }
        return this.client.send({ cmd:'updateBook'}, payload)
    }

    @Delete(':id')
    deleteBookById(@Param('id') id: number): any {
        const payload: PayloadBookService = {
            id: id,
            book: null
        }
        return this.client.send({ cmd:'deleteBookById'}, payload)
    }

}
