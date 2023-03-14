import { IsNotEmpty, IsString } from 'class-validator';

export class EditCommentDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}
