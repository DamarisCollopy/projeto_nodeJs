import { getCustomRepository, Repository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { Settings } from "../entities/Settings";


interface ISettingsCreate {
    chat: boolean;
    username: string;
}


class SettingsService {
    private settingsRepository: Repository<Settings> = getCustomRepository(SettingsRepository);

    async create({ chat, username }: ISettingsCreate) {

        // select * from settings where username = "username" limit 1;
        const userAlreadyExists = await this.settingsRepository.findOne({
            username: username
        });

        if (userAlreadyExists) {
            throw new Error(`User ${username} already exists!`);
        }

        const settings = this.settingsRepository.create({
            chat,
            username
        });

        await this.settingsRepository.save(settings);

        return settings;
    }

    async findByUsername(username:string){
        const usernameSettings = await this.settingsRepository.findOne({
            username,
        });
        return usernameSettings; 
    }

    async update(username:string,chat:boolean){
        const settings = await this.settingsRepository.createQueryBuilder()
        .update(Settings).set({chat}).where("username=:username",{
            username
        }).execute
    }
}


export { SettingsService };