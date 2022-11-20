import UseCaseInterface from "../../../../domain/@shared/usecase/use-case.interface";
import UserRepositoryInterface from "../../../../domain/users/repository/user.repository.interface";
import { AuthenticateUserInputDto, AuthenticateUserOutputDto } from "./authenticate_user.dto";


export default class AuthenticateUserUseCase implements UseCaseInterface {

    private userRepository: UserRepositoryInterface

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async execute(input: AuthenticateUserInputDto): Promise<AuthenticateUserOutputDto> {

        const user = await this.userRepository.findByUsername(input.username)

        const isAuthenticated = user.verifyPassword(input.password)

        if (!isAuthenticated) {
            throw new Error("the password is incorrect")
        }

        return {
            isAuthenticated: isAuthenticated,
            userId: user.id
        }
    }
}