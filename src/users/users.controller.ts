import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'

@Controller('users')
export class UsersController {
  @Get()
  findAllUsers() {
    return []
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return { id }
  }

  @Post()
  createUser(@Body() body: object) {
    return body
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: object) {
    return { id, ...body }
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return { id }
  }
}
