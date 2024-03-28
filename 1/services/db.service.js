/**
 * Тут работаем с db/applications.json
 * удаляем данные
 * заполняем данными
 * изменяем данные
 */
import fs from "fs";
import {config} from "dotenv";

export class DbService {
    constructor() {
        config()
    }

    static getFileData() {
        return JSON.parse(fs.readFileSync(process.env.FILE_PATH_DB, 'utf8'));
    }

    static async getApplications() {
        return this.getFileData();
    }

    static async getApplication(id) {
        return this.getFileData().find(app => app.id === id);
    }

    static async deleteApplication(id) {
        const fileData = this.getFileData();

        const updatedApplications = fileData.filter(app => app.id !== id);

        if (updatedApplications.length < fileData.length) {
            fs.writeFileSync(process.env.FILE_PATH_DB, JSON.stringify(updatedApplications, null, 2));
            return true;
        }

        return false;
    }

    static async updateApplication(data) {
        const dataToUpdate = {
            id: data.id,
            name: data.name,
        };

        const updatedApplications = this.getFileData().map(app => {
            if (app.id === data.id && app.date) {
                return { id: app.id, name: data.name, date: app.date };
            }
            return app;
        });

        fs.writeFileSync(process.env.FILE_PATH_DB, JSON.stringify(updatedApplications, null, 2));
        return dataToUpdate;
    }

    static async saveApplication(data) {
        try {
            const application = {
                id: data.id,
                name: data.name,
                date: data.date
            }

            let applications = [];

            try {
                const data = this.getFileData();
                applications = data ? data : [];
            } catch (error) {
                console.error(error)
            }

            applications.push(application);
            fs.writeFileSync(process.env.FILE_PATH_DB, JSON.stringify(applications, null, 2));
        } catch (error) {
            throw new Error('Failed to save application in the database');
        }
    }
}
