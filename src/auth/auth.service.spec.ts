import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
// import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Repository } from 'typeorm';

const userArray: CreateUserDto[] = [
  {
    login: 'clem',
    password: '$2b$10$NFr0geTDqIAliU2kIRvbr.m5MdWTYzi8WtcMTJfk82xtr5XKWA5Ie', // mySuperPassword
  },
  {
    login: 'firstName #2',
    password: '$2b$10$y8PdaL2tHtK/yb9AV63bkeZkGxUKKn9XIKI9f3oclOm16kizKpnDm', // myStrongPassword
  },
];

const oneUser: CreateUserDto = userArray[0];

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let usersRepository: Repository<User>;

  // const usersRepository = {
  //   create: jest.fn(),
  //   save: jest.fn(),
  //   // findOne: jest.fn(),
  //   // find: jest.fn(),
  // } as unknown as Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOneBy: jest.fn().mockResolvedValue(oneUser),
            save: jest.fn().mockResolvedValue(oneUser),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('hashPassword()', () => {
    it('should not return empty', () => {
      expect(authService.hashPassword('abc')).resolves.not.toBeFalsy();
    });

    it('should hash correctly', () => {
      const password: string = 'mySuperPassword';

      const passwordHash = authService.hashPassword(password);

      expect(passwordHash).resolves.not.toEqual(password);
    });
  });

  describe('comparePassword()', () => {
    it('should have correctly hash', async () => {
      const password: string = 'myStrongPassword';

      const passwordHash = await authService.hashPassword(password);
      const result = await authService.comparePassword(password, passwordHash);

      expect(result).toBe(true);
    });
  });

  describe('register()', () => {
    it('should correctly create user with hash password', () => {
      // const repoSpy = jest.spyOn(authService.hashPassword, 'password');

      const createUser: CreateUserDto = {
        login: 'clem',
        password: 'mySuperPassword',
      };

      // 1. call register with correct data
      authService.register(createUser);
      // expect(authService.register(createUser)).resolves.toEqual(createUser);

      // 2. check if hashPassword have been called
      expect(authService.hashPassword).toHaveBeenCalledWith({
        password: createUser.password,
      });

      // 3. check if usersService have been called
      // 4. get user and compare with comparePassword()
    });
  });

  describe('login()', () => {
    it('should correctly retrieve user', () => {
      const createUser: CreateUserDto = {
        login: 'clem',
        password: 'mySuperPassword',
      };

      // 1. call login with correct value
      authService.login(createUser);

      // 2. check if comparePassword have been called

      // 3. check if findOne have been called

      // 4. get jwt
    });

    //   it('should successfully login user', async () => {
    //     const loginDto = {
    //       login: 'testuser',
    //       password: 'password123',
    //     };

    //     const user = new User();
    //     Object.assign(user, loginDto);

    //     mockUserRepository.findOne.mockResolvedValue(user);

    //     const result = await service.login(loginDto);

    //     expect(mockUserRepository.findOne).toHaveBeenCalledWith({
    //       where: { login: loginDto.login },
    //     });
    //     expect(result).toEqual(user);
    //   });
  });
});
