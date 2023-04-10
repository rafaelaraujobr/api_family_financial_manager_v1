import { TypeWallet } from '@prisma/client';

export class WalletEntity {
  id: string;
  name: string;
  description?: string;
  type?: TypeWallet;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
