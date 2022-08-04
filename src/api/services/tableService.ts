import { AxiosResponse } from "axios";
import type { ITableSettings, IColumnData, IFilterOptionsWrapper } from "../../pages/Table/TableWrapper";
import {lkApi} from "../config";

class tableService {

    async setTableSettings(sellerId: string, data: ITableSettings, columnData: IColumnData[]): Promise<AxiosResponse> {
        return lkApi.post(`/api/${sellerId}/save-table-settings`, JSON.stringify({ settings: data, columnData: columnData }));
    }

    async getGlobalTableSettings(sellerId: string) {
        return lkApi.get(`/api/${sellerId}/get-global-table-settings`);
    }

    async getTableSettings(sellerId: string): Promise<AxiosResponse> {
        return lkApi.get(`/api/${sellerId}/get-table-settings`)
    }

    async createTableFilter(sellerId: string, data: IFilterOptionsWrapper): Promise<AxiosResponse> {
        return lkApi.post(`/api/${sellerId}/create-table-filter`, JSON.stringify(data))
    }

    async getSavedTableFilters(sellerId: string): Promise<AxiosResponse> {
        return lkApi.get(`/api/${sellerId}/get-saved-table-filters`)
    }

    async changeSavedTableFilter(sellerId: string, data: IFilterOptionsWrapper): Promise<AxiosResponse> {
        return lkApi.patch(`/api/${sellerId}/change-saved-table-filter`, JSON.stringify(data))
    }

    async deleteSavedTableFilter(sellerId: string, data: IFilterOptionsWrapper): Promise<AxiosResponse> {
        return lkApi.post(`/api/${sellerId}/delete-saved-table-filter`, JSON.stringify(data));
    }

}

export default new tableService();