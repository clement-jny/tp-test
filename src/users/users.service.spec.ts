import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

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

describe('UsersService', () => {
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

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      const oneUser: CreateUserDto = {
        login: 'firstName #1',
        password: 'lastName #1',
      };

      expect(
        usersService.create({
          login: 'firstName #1',
          password: 'lastName #1',
        }),
      ).resolves.toEqual(oneUser);
    });

    it('should successfully create a new user', () => {
      const createUserDto = new CreateUserDto();
      createUserDto.login = 'testuser';
      createUserDto.password = 'password123';

      usersService.create(createUserDto);

      expect(usersRepository.save).toHaveBeenCalledWith(createUserDto);

      //     expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
      //     expect(mockUserRepository.save).toHaveBeenCalledWith(newUser);
      //     expect(result).toEqual(newUser);

      // expect(service.register(createUserDto)).toEqual({
      //   status: true,
      //   message: 'OK',
      // });
    });

    //   it('should throw error if user already exists', async () => {
    //     const createUserDto = new CreateUserDto();
    //     createUserDto.login = 'existinguser';
    //     createUserDto.password = 'password123';

    //     mockUserRepository.findOne.mockResolvedValue(new User()); // User exists

    //     await expect(service.register(createUserDto)).rejects.toThrow(
    //       'User already exists',
    //     );
    //   });
  });

  //   it('should throw error if user not found', async () => {
  //     const loginDto = {
  //       login: 'nonexistent',
  //       password: 'password123',
  //     };

  //     mockUserRepository.findOne.mockResolvedValue(null);

  //     await expect(service.login(loginDto)).rejects.toThrow('User not found');
  //   });

  //   it('should throw error if password is incorrect', async () => {
  //     const loginDto = {
  //       login: 'testuser',
  //       password: 'wrongpassword',
  //     };

  //     const user = new User();
  //     user.login = 'testuser';
  //     user.password = 'correctpassword';

  //     mockUserRepository.findOne.mockResolvedValue(user);

  //     await expect(service.login(loginDto)).rejects.toThrow(
  //       'Invalid credentials',
  //     );
  //   });
});
