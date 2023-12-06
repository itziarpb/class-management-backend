import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    //Login User
    async findOne(email: string): Promise<User | null> {
        const options: FindOneOptions<User> = {
            where: { email },
        };
        return await this.userRepo.findOne(options)
    }
}
