import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    //FindOne function for register and login
    async findOne(email: string): Promise<User> {
        const options: FindOneOptions<User> = {
            where: { email },
        };
        const user = await this.userRepo.findOne(options)
        return user
    }

    //get user by id
    async getUser(userId: string) {
        const user = await this.userRepo.findOneOrFail({
            where: {
                id: userId
            }
        });
        return user
    }
}
