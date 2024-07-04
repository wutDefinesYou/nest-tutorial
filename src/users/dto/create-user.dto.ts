import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { Role } from '../type/role'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string

  @IsEnum(['USER', 'EDITOR', 'ADMIN'], { message: 'valid role required' })
  role: Role
}
