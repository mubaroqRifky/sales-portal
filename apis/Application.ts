import BaseAPI from "./BaseAPI";

export default class Application extends BaseAPI {
    constructor(cookieKey?: any) {
        super(cookieKey);
    }

    async getAll(params: any) {
        this.fetcher = $fetch;
        const response = await this.get("applications", params);

        if (response.error?.value) throw response.error?.value;
        return response;
    }

    async getUserApp(params: any) {
        this.fetcher = $fetch;
        const response = await this.get("applications/users", params);

        if (response.error?.value) throw response.error?.value;
        return response;
    }

    async connectApps(payload: any) {
        this.fetcher = $fetch;
        const response = await this.post("applications/connect", payload);

        if (response.error?.value) throw response.error?.value;
        return response;
    }
}
