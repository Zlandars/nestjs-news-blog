import { Test, TestingModule } from '@nestjs/testing';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

describe('NewsController', () => {
  let newsController: NewsController;
  let newsService: NewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [NewsService],
    }).compile();

    newsController = module.get<NewsController>(NewsController);
    newsService = module.get<NewsService>(NewsService);
  });

  describe('getAllNews', () => {
    it('Should return array News["users", "comments"]', async () => {
      const result = [];
      jest.spyOn(newsService, 'getAll').mockImplementation(() => result);
      expect(await newsService.getAll()).toBe(result);
    });
  });
});
