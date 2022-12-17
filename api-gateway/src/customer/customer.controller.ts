import { Inject, Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';
import { PayloadCustomerService } from './payload-customer-service.interface';
@Controller('customer')
export class CustomerController {
    constructor(
        @Inject('CUSTOMER_SERVICE') private client: ClientProxy
    ){}

    @Get()
    getCustomers(): any {
        return this.client.send({ cmd:'getCustomers'}, '')
    }

    @Get(':id')
    getCustomerById(@Param('id') id: number): any {
        const payload: PayloadCustomerService = {
            id: id,
            customer: null
        }
        return this.client.send({ cmd:'getCustomerById'}, payload)
    }

    @Post()
    createCustomer(@Body() createCustomerDTO: CreateCustomerDTO): any {
        const payload: PayloadCustomerService = {
            id: null,
            customer: createCustomerDTO
        }
        return this.client.send({ cmd:'createCustomer'}, payload)
    }

    @Put(':id')
    updateCustomer(@Param('id') id: number, @Body() updateCustomerDTO: UpdateCustomerDTO): any {
        const payload: PayloadCustomerService = {
            id: id,
            customer: updateCustomerDTO
        }
        return this.client.send({ cmd:'updateCustomer'}, payload)
    }

    @Delete(':id')
    deleteCustomerById(@Param('id') id: number): any {
        const payload: PayloadCustomerService = {
            id: id,
            customer: null
        }
        return this.client.send({ cmd:'deleteCustomerById'}, payload)
    }
}
