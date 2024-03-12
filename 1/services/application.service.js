import {DbService} from "./db.service.js";
import {uuidv7} from "uuidv7";
import {
    ApplicationDeleteResponseModel,
    ApplicationModel,
    ApplicationPostResponseModel,
    ApplicationPutModel,
    ApplicationResponseModel,
    ApplicationsResponseModel
} from "../model/application.models.js";

export class ApplicationService {
    async getAllApplications() {
        try {
            const response = new ApplicationsResponseModel();
            response.applications = await DbService.getApplications();
            return response.applications;
        } catch (error) {
            throw new Error('Failed to get applications');
        }
    }

    async getApplication(id) {
        try {
            const application = new ApplicationResponseModel();
            application.application = await DbService.getApplication(id);
            return application.application;
        } catch (error) {
            throw new Error('Failed to get application');
        }
    }

    async deleteApplication(id) {
        try {
            const success = new ApplicationDeleteResponseModel();
            success.success = await DbService.deleteApplication(id);
            return success.success;
        } catch (error) {
            throw new Error('Failed to delete application');
        }
    }

    async updateApplication(id, name) {
        try {
            const appPut = new ApplicationPutModel();
            appPut.applicationName = name;
            return await DbService.updateApplication({id, name});
        } catch (error) {
            throw new Error('Failed to update application');
        }
    }

    async addApplication(name) {
        try {
            const application = new ApplicationModel();

            application.applicationName = name;
            application.applicationId = uuidv7();
            application.createDate = new Date().getUTCDate();
            await DbService.saveApplication({id: application.applicationId, name: application.applicationName, date: application.createDate});

            const response = new ApplicationPostResponseModel();
            response.applicationId = application.applicationId;
            return response.applicationId;
        } catch (error) {
            throw new Error('Failed to create application');
        }
    }
}
