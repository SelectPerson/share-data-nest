import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create({ ...createUserDto });
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  async findOne(id) {
    return await this.userModel.findOne({ where: { id } });
  }

  async update(id, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne({ where: { id } });
    return await user.update({ ...user, ...updateUserDto });
  }

  async remove(id): Promise<void> {
    const user = await this.userModel.findOne({ where: { id } });
    return await user.destroy();
  }

  async findByEmail(email) {
    return await this.userModel.findOne({ where: { email } });
  }
}
