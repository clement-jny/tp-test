import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  const usersRepository = {
    create: jest.fn(),
    save: jest.fn(),
    // findOne: jest.fn(),
    // find: jest.fn(),
  } as unknown as Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('HashPassword', () => {
    it('should not return empty', () => {
      expect(authService.hashPassword('abc')).not.toBeFalsy();
    });

    it('should hash correctly', () => {
      const password: string = 'abc';

      const newPassword = authService.hashPassword(password);

      expect(password).not.toEqual(newPassword);
    });
  });
});
