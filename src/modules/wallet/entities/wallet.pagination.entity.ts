import { WalletEntity } from './wallet.entity';

export class WalletPaginationEntity {
  records: WalletEntity[];
  total: number;
  pages: number;
}
