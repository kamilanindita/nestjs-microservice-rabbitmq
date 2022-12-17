import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { BookService } from './book.service';
import { PayloadBookService } from './payload.interface';

@Controller('book')
export class BookController {
    constructor(
        private readonly bookService: BookService
    ){}

    @MessagePattern({ cmd:'getBooks' })
    getBooks(@Ctx() context: RmqContext): any {
        //handles acknowledgments manually
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);

        return this.bookService.findAll();
    }

    @MessagePattern({ cmd:'getBookById' })
    getBookById(@Payload() payload: PayloadBookService, @Ctx() context: RmqContext): any {
        //handles acknowledgments manually
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);

        return this.bookService.findOne(Number(payload.id));
    }

    @MessagePattern({ cmd:'createBook'})
    createBook(@Payload() payload: PayloadBookService, @Ctx() context: RmqContext): any {
        //handles acknowledgments manually
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);

        return this.bookService.create(payload.book);
    }

    @MessagePattern({ cmd:'updateBook'})
    updateBook(@Payload() payload: PayloadBookService, @Ctx() context: RmqContext): any {
        //handles acknowledgments manually
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);

        return this.bookService.update(Number(payload.id), payload.book);
    }

    @MessagePattern({ cmd:'deleteBookById' })
    deleteBookById(@Payload() payload: PayloadBookService, @Ctx() context: RmqContext): any {
        //handles acknowledgments manually
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);
        
        return this.bookService.delete(Number(payload.id));
    }
}
