import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionRepository } from "../repositories/ConnectionRepository";

interface IConnectionCreate {
    socked_id : string;
    admin_id?: string;
    id?: string;
    user_id: string;
}

class ConnectionService {
    private connectionRepository: Repository<Connection>; 

    constructor(){
      this.connectionRepository = getCustomRepository(ConnectionRepository);
    }

    async create({socked_id,admin_id, id, user_id} : IConnectionCreate) {

        const connection = this.connectionRepository.create({
            socked_id,
            admin_id,
            id,
            user_id
        });

        await this.connectionRepository.save(connection);

        return connection;
    }

    async findById(user_id:string){
      const connection = await this.connectionRepository.findOne({
          user_id,
      });
      return connection;
  }
  
}

export { ConnectionService };