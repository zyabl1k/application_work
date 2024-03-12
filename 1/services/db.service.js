/**
 * Тут работаем с db/applications.json
 * удаляем данные
 * заполняем данными
 * изменяем данные
 */
import fs from "fs";

export class DbService {

    static getFileData() {
        const filePath = './1/db/applications.json';
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    static async getApplications() {
        return this.getFileData();
    }

    static async getApplication(id) {
        return this.getFileData().find(app => app.id === id);
    }

    static async deleteApplication(id) {
        const filePath = './1/db/applications.json';
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const updatedApplications = fileData.filter(app => app.id !== id);

        if (updatedApplications.length < fileData.length) {
            fs.writeFileSync(filePath, JSON.stringify(updatedApplications, null, 2));
            return true;
        }

        return false;
    }


    static async updateApplication(data) {
        const filePath = './1/db/applications.json';
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

        fs.writeFileSync(filePath, JSON.stringify(updatedApplications, null, 2));
        return dataToUpdate;
    }

    static async saveApplication(data) {
        try {
            const filePath = './1/db/applications.json';

            const application = {
                id: data.id,
                name: data.name,
                date: data.date
            }

            let applications = [];

            try {
                const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                applications = data ? data : [];
            } catch (error) {
                console.error(error)
            }

            applications.push(application);
            fs.writeFileSync(filePath, JSON.stringify(applications, null, 2));
        } catch (error) {
            throw new Error('Failed to save application in the database');
        }
    }
}
