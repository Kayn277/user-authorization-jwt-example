import { Body, Controller, Delete, Get, HttpStatus, Inject, Post, Response, Param, Put, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(AuthGuard('local'))
    @Get()
    async findAll() : Promise<User[]> {
        return await this.userService.findAll();
    }

    @Get('/:id')
    async findOne(@Param() param, @Response() res){
        const getUser = await this.userService.findOne(param.id);
        if(getUser) {
            return res.status(HttpStatus.OK).json(getUser);
        }
        else {
            return res.status(HttpStatus.NOT_FOUND).json(JSON.parse('{"Error": "Not Found"}'));
        }
    }


    @Post()
    async addOne(@Response() res, @Body() userDto: UserDto) {
        const add = await this.userService.addOne(userDto);
        return res.status(HttpStatus.OK).json(add);
    }

    @Delete('/:id')
    async deleteById(@Param() param, @Response() res) {
        const deleteUser = await this.userService.deleteOne(param.id);
        return res.status(HttpStatus.OK).json(deleteUser);
    }

    @Put('/:id')
    async updateOne(@Param() param, @Response() res, @Body() userDto: UserDto) {
        const updateUser = await this.userService.updateOne(param.id, userDto);
        if(updateUser[0] != 0) {
            return res.status(HttpStatus.OK).json(userDto);
        }
        else {
            return res.status(HttpStatus.NOT_FOUND).json(JSON.parse('{"Error": "Not Found"}'));
        }
    }


}
