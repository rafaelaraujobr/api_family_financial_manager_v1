import { Test, TestingModule } from '@nestjs/testing';
import { RealmController } from './realm.controller';
import { RealmService } from './realm.service';

describe('RealmController', () => {
  let controller: RealmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealmController],
      providers: [RealmService],
    }).compile();

    controller = module.get<RealmController>(RealmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
