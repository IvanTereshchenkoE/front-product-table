import { AxiosResponse } from "axios";
import {lkApi} from "../config";

import type { ITableSettings, IRowData } from "../../pages/Table/TableWrapper";

interface IActionSellerProduct {
    product: IRowData | Array<IRowData>,
    sellerId: string
}

class sellerProductsService {

    async getSellerProducts(sellerId: string, data: ITableSettings): Promise<AxiosResponse> {

        return lkApi.post(`/api/${sellerId}/products`, JSON.stringify(data))
    }

    async changeSellerProduct(data: IActionSellerProduct): Promise<AxiosResponse> {
        return lkApi.patch(`/api/${data.sellerId}/change-product`, JSON.stringify(data.product))
    }

    async deleteSellerProduct(data: IActionSellerProduct): Promise<AxiosResponse> {
        return lkApi.post(`/api/${data.sellerId}/delete-product`, JSON.stringify(data.product))
    }

}

export default new sellerProductsService();