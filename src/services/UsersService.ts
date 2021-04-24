import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

class UsersService {
  private userRepository: Repository<User> = getCustomRepository(UserRepository);

  async create(email: string) {
      
      // Verificar se o usuário existe.

      let user = await this.userRepository.findOne({
          email
      });

      
      if (!user) {
          // Se não existir, salvar no BD.
          
          user = this.userRepository.create({
              email
          });
          
          await this.userRepository.save(user);
      }
      
      // Se existir, retornar o usuário.

      return user;
  }
  
  async findByEmail(email:string){
      const emailUser = await this.userRepository.findOne({
          email,
      });
      return emailUser;
  }

}

export { UsersService };