import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Role } from './type/role'

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      role: 'ADMIN',
    },
  ]

  findAll(role?: Role) {
    if (role) {
      const usersByRole = this.users.filter((user) => user.role === role)
      if (usersByRole.length === 0)
        throw new NotFoundException('No user found.')
      return usersByRole
    }
    return this.users
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id)
    if (!user) throw new NotFoundException('User not found.')
    return user
  }

  create(createUserDto: CreateUserDto) {
    const sorted = [...this.users].sort((a, b) => a.id - b.id)
    const newUser = {
      id: sorted.at(-1).id + 1,
      ...createUserDto,
    }
    this.users = [...this.users, newUser]
    return newUser
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) return { ...user, ...updateUserDto }
      return user
    })
    return this.findOne(id)
  }

  delete(id: number) {
    const userToRemove = this.findOne(id)
    this.users = this.users.filter((user) => user.id !== id)
    return userToRemove
  }
}
