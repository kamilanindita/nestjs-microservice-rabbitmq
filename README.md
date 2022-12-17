# nestjs-microservice-rabbitmq
[Nestjs microservice](https://docs.nestjs.com/microservices/rabbitmq) use the RabbitMQ transport layer.

Queues in RabbitMQ can be durable or transient. The metadata of a durable queue is stored on the disk. If the queue is not durable, it is deleted during boot and would not survive a restart. It would delete not-consumed messages.

The consumer sends back an acknowledgment, stating that it received and processed the message. If the consumer fails to consume the message fully, RabbitMQ will re-queue it.

By default, NestJS handles acknowledgments automatically. We can do that manually, though. To do that, we need to pass the noAck: false flag when creating a microservice.

Architecture with RabbitMQ transport in this project

![Architecture Microservices in Nestjs](./architecture.png?raw=true)

## Requirements
1. Docker
2. DockerDocker-Compose

## Dependencies
- node:16-alpine3.16 (Image)
- nestjs
- @nestjs/microservices
- amqplib 
- amqp-connection-manager
- rabbitmq (rabbitmq:3-management image)

## Features/Modules/Services
- Api gateway
- Customer service
- Book service

## Setup config `.env`
Copy file `.env.prod.example` to `.env.prod`, and<br>

## Running the Service
```bash
$ docker-compose up -d
```
## Stop the Service
```bash
$ docker-compose down
```

## The endpoint services
    Customer service: http://localhost:3000/customer <br>
    1. GET: http://localhost:3000/customer
    2. GET: http://localhost:3000/customer/{id}
    3. POST: http://localhost:3000/customer
    4. PUT: http://localhost:3000/customer/{id}
    5. DELETE: http://localhost:3000/customer/{id}
    
    Book service: http://localhost:3000/book <br>
    1. GET: http://localhost:3000/book
    2. GET: http://localhost:3000/book/{id}
    3. POST: http://localhost:3000/book
    4. PUT: http://localhost:3000/book/{id}
    5. DELETE: http://localhost:3000/book/{id}


