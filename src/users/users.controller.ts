import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ActiveUser } from '../iam/decorators/active-user-decorator';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // This is an example on how to get the email of the logged-in user
  @Get()
  findAll(@ActiveUser('email') email: ActiveUserData['email']) {
    console.log(email);
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
