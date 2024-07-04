import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAllUsers(@Query('role') role?: 'USER' | 'EDITOR' | 'ADMIN') {
    return this.usersService.findAll()
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Post()
  createUser(@Body() body: { name: string; email: string; role: string }) {
    return this.usersService.create(body)
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: object) {
    return this.usersService.update(+id, body)
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(+id)
  }
}
