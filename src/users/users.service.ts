import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { CreateUsersDto } from './dto/create.users.dto';
import { hash } from '../utils/crypto';
import { EditUsersDto } from './dto/edit.users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async create(user: CreateUsersDto): Promise<UsersEntity> {
    const userEntity = new UsersEntity();
    userEntity.firstName = user.firstName;
    userEntity.email = user.email;
    userEntity.roles = user.roles;
    userEntity.password = await hash(user.password);
    return this.usersRepository.save(userEntity);
  }

  async edit(userId: number, user: EditUsersDto): Promise<UsersEntity> {
    const _user = await this.findById(userId);
    _user.firstName = user.firstName || _user.firstName;
    _user.email = user.email || _user.email;
    _user.roles = user.roles || _user.roles;
    _user.password = (await hash(user.password)) || _user.password;
    return this.usersRepository.save(_user);
  }

  async findById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email): Promise<UsersEntity> {
    return await this.usersRepository.findOneBy({ email });
  }
}
