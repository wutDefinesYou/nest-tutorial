import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Ip,
} from '@nestjs/common'
import { EmployeesService } from './employees.service'
import { Prisma, Role, Employee as EmployeeModel } from '@prisma/client'
import { LoggerService } from 'src/logger/logger.service'

@Controller('employees')
export class EmployeesController {
  private readonly loggerService = new LoggerService(EmployeesController.name)

  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(
    @Body() createEmployeeDto: Prisma.EmployeeCreateInput,
  ): Promise<EmployeeModel> {
    return this.employeesService.create(createEmployeeDto)
  }

  @Get()
  findAll(
    @Ip() ip: string,
    @Query('role') role?: Role,
  ): Promise<EmployeeModel[]> {
    this.loggerService.log(
      `Requested for all employees\t${ip}`,
      EmployeesController.name,
    )
    return this.employeesService.findAll(role)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<EmployeeModel> {
    return this.employeesService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ): Promise<EmployeeModel> {
    return this.employeesService.update(id, updateEmployeeDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<EmployeeModel> {
    return this.employeesService.remove(id)
  }
}
