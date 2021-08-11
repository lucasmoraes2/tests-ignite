import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { User } from "../../entities/User";

let inMemoryUsersRepository: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Show User Profile", () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to show an user profile", async () => {
    const user: ICreateUserDTO = {
      email: "cetuvu@jonwi.mp",
      name: "Arthur Jenkins",
      password: "197196"
    };

    const newUser = await createUserUseCase.execute(user);

    const result = await showUserProfileUseCase.execute(newUser.id as string);

    expect(result).toBeInstanceOf(User);
  });
});
