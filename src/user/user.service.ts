import { Inject, Injectable } from '@nestjs/common';
import {User} from './user.entity';
import {UserDto} from "./dto/user.dto"
import { where } from 'sequelize/types';
@Injectable()
export class UserService {
    constructor(@Inject('USER_REPOSITORY') private userRepository: typeof User) {}

    async findAll() : Promise<User[]>{
        return await this.userRepository.findAll<User>();
    }

    async findOne(ID: number) : Promise<User> {
        return await this.userRepository.findByPk(ID);
    }

    async findOneByName(userName: string) : Promise <User> {
        return await this.userRepository.findOne({where: {login: userName}});
    }

    async addOne(user: UserDto) : Promise<User> {
        return await this.userRepository.create<User>(user);
    }

    async deleteOne(ID: number) : Promise<number> {
        return await this.userRepository.destroy({
            where: {id: ID}
        });
    }

    async updateOne(ID: number ,newUser: UserDto) : Promise<[number ,User[]]> {
        return await this.userRepository.update(newUser, {where: {id: ID}})
    }
}
