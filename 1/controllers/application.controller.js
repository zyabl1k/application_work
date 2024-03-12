import { ApplicationService } from "../services/application.service.js";
import express from "express";

export class ApplicationController {

    constructor() {
        this.router = express.Router();
        this.service = new ApplicationService();

        this.router.get('/apps', this.getAllApplications.bind(this));
        this.router.get('/app/:id', this.getApplication.bind(this));
        this.router.post('/create', this.addApplication.bind(this));
        this.router.put('/app/:id', this.updateApplication.bind(this));
        this.router.delete('/app/:id', this.deleteApplication.bind(this));

        return this.router
    }

    async addApplication(req, res) {
        try {
            const app = await this.service.addApplication(req.body.applicationName);
            res.status(200).json({ app });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getAllApplications(req, res) {
        try {
            const apps = await this.service.getAllApplications();
            res.status(200).json({ apps });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getApplication(req, res) {
        try {
            const application = await this.service.getApplication(req.params.id)
            res.status(200).json({application});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async updateApplication(req, res) {
        try {
            const application = await this.service.updateApplication(req.params.id, req.body.applicationName);
            res.status(200).json({application});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async deleteApplication(req, res) {
        try {
            const application = await this.service.deleteApplication(req.params.id);
            res.status(200).json({application});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}


