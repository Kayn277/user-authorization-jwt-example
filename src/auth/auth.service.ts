import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {};
    async validateUser(login: string, password: string): Promise<UserDto | null> {
        const user = await this.userService.findOneByName(login);
        if(user && user.password == password) {

            const { password, ...result } = user;
            return result;
        }
        return null;
    }





    async login(user: UserDto) {
        const payload = {id: user.id}
        return {
            accesToken: this.jwtService.sign(payload)
        }
    }

}
