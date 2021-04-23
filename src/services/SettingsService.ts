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
}


export { SettingsService };