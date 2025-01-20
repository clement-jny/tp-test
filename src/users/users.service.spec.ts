import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
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
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    // usersService = new UsersService(usersRepository); // repository as unknown as Repository<User>
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('Create', () => {
    it('should successfully create a new user', () => {
      const createUserDto = new CreateUserDto();
      createUserDto.login = 'testuser';
      createUserDto.password = 'password123';

      usersService.create(createUserDto);

      expect(usersRepository.create).toHaveBeenCalledWith(createUserDto);

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
