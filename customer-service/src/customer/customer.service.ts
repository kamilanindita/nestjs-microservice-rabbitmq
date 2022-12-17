import { Injectable } from '@nestjs/common';
import { CUSTOMERS } from './data-mock/customers';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {

    private customers = CUSTOMERS

    findAll(): Promise<any> {
        return new Promise(resolve => {
            resolve(this.customers);
        });
    }

    findOne(id: number): Promise<any>{
        return new Promise(resolve => {
            const customer = this.customers.find( customer => customer.id === id);
            if (!customer) {
                resolve('Customer does not exist!');
            }
            resolve(customer);
        });
    }

    create(createCustomerDTO: CreateCustomerDTO): Promise<any> {
        return new Promise(resolve => {
            // manual increment
            const lastcustomer = this.customers.slice(-1)[0]
            const id = lastcustomer.id? Number(lastcustomer.id)+1 : 1

            const newCustomerDTO = {
                id: id,
                ...createCustomerDTO
            }

            this.customers.push(newCustomerDTO);
            resolve(this.customers.slice(-1)[0]);
        });
      }

    update(id: number, updateCustomerDTO: UpdateCustomerDTO): Promise<any> {
        return new Promise(resolve => {
            //Find index of specific object using findIndex method.    
            const customerIndex = this.customers.findIndex((customer => customer.id == id));
            if (customerIndex === -1) {
                resolve('Customer does not exist!');
            }

            //Update object's property.
            this.customers[customerIndex].name = updateCustomerDTO.name
            this.customers[customerIndex].email = updateCustomerDTO.email
            this.customers[customerIndex].address = updateCustomerDTO.address

            resolve(this.customers.find( customer => customer.id === id));
        });
      }

    delete(id: number): Promise<any> {
        return new Promise(resolve => {
            const customerIndex = this.customers.findIndex(customer => customer.id === id);
            if (customerIndex === -1) {
                resolve('Customer does not exist!');
            }
            this.customers.splice(customerIndex, 1);
            resolve('Customer has been deleted');
        });
    }
}
