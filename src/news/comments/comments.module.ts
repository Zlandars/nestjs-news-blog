import { forwardRef, Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsEntity } from './comments.entity';
import { UsersModule } from '../../users/users.module';
import { NewsModule } from '../news.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsEntity]),
    UsersModule,
    forwardRef(() => NewsModule),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService, TypeOrmModule.forFeature([CommentsEntity])],
})
export class CommentsModule {}
