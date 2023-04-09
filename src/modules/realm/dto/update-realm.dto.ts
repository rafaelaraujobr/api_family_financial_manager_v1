import { PartialType } from '@nestjs/mapped-types';
import { CreateRealmDto } from './create-realm.dto';

export class UpdateRealmDto extends PartialType(CreateRealmDto) {}
