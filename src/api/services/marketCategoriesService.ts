import { AxiosResponse } from "axios";
import {lkApi} from "../config";

interface IMetaData {
    sellerId: string,
    marketName: string,
    category?: string
}

class marketCategoriesService {

    async getCategoriesForMarket(data: IMetaData): Promise<AxiosResponse> {
        return lkApi.get(`/api/${data.sellerId}/seller-product/categories-for-market/${data.marketName && data.marketName}`);
    }

    async getDefaultMarketCategories(data: IMetaData): Promise<AxiosResponse> {
        return lkApi.get(`/api/${data.sellerId}/seller-product/fields-meta-data-for-market/${data.marketName && data.marketName}`);
    }

    async getFieldsForCategory(data: IMetaData): Promise<AxiosResponse> {
        return lkApi.get(`/api/${data.sellerId}/seller-product/fields-meta-data-for-category/${data.marketName}/${data.category}`);
    }

}

export default new marketCategoriesService();