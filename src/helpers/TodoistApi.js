import * as axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export default class TodoistApi {
    constructor() {
        this.apiToken = "b3c567db62e0a4b868b7af263cb8115200673206";
        this.apiUrl = "https://api.todoist.com/rest/v1/tasks";
    }

    init = () => {
        let headers = {
            Authorization: `Bearer ${this.apiToken}`,
            "Content-Type": "application/json",
            "X-Request-Id": uuidv4()
        };

        this.client = axios.create({
            baseURL: this.apiUrl,
            headers: headers
        });

        return this.client;
    };

    getTasksList = () => {
        return this.init().get("/");
    };

    closeTask = (taskId) => {
        return this.init().post(`/${taskId}/close`);
    };

    updateTasks = (taskId, content) => {
        const data = {
            content: content
        }
        return this.init().post(`/${taskId}`, data);
    };
}