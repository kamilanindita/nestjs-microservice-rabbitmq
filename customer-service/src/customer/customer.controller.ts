import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CustomerService } from './customer.service';
import { PayloadCustomerService } from './payload.interface';

@Controller('customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService
    ){}

    @MessagePattern({ cmd:'getCustomers' })
    getCustomers(@Ctx() context: RmqContext): any {
        //handles acknowledgments manually
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);

        return this.customerService.findAll();
    }

    @MessagePattern({ cmd:'getCustomerById' })
    getCustomerById(@Payload() payload: PayloadCustomerService, @Ctx() context: RmqContext): any {
        //handles acknowledgments manually
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);

        return this.customerService.findOne(Number(payload.id));
    }

    @MessagePattern({ cmd:'createCustomer'})
    createCustomer(@Payload() payload: PayloadCustomerService, @Ctx() context: RmqContext): any {
        //handles acknowledgments manually
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);

        return this.customerService.create(payload.customer);
    }

    @MessagePattern({ cmd:'updateCustomer'})
    updateCustomer(@Payload() payload: PayloadCustomerService, @Ctx() context: RmqContext): any {
        //handles acknowledgments manually
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);

        return this.customerService.update(Number(payload.id), payload.customer);
    }

    @MessagePattern({ cmd:'deleteCustomerById' })
    deleteCustomerById(@Payload() payload: PayloadCustomerService, @Ctx() context: RmqContext): any {
        //handles acknowledgments manually
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);

        return this.customerService.delete(Number(payload.id));
    }
}
