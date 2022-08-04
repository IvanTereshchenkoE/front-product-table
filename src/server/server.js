import { hasMany, belongsTo, Model, Response } from "miragejs";

import { server } from "../App";

import { deleteMirageItemFromLocalStorage, getMirageItemsFromLocalStorage, setMirageItemToLocalStorage, updateMirageItemFromLocalStorage } from "../utils/LocalStorageHelper";

localStorage.setItem("mirageDB", JSON.stringify([{"model":"seller","data":{"id":"1","name":"hello world"}}]));

export const apiMockConfig = {

        models: {
            user: Model.extend ({
                sellers: hasMany()
            }),
            seller: Model.extend ({
                user: belongsTo()
            }),

            token: Model,
            notification: Model,

            market: Model.extend({
                fields: hasMany(),
                categories: hasMany()
            }),
            field: Model.extend({
                market: hasMany(),
            }),
            category: Model.extend({
                market: belongsTo()
            }),
            product: Model.extend({
                seller: belongsTo(),
            }),
            categoryAttribute: Model.extend({
                category: belongsTo(),
                fields: hasMany()
            }),

            tableSetting: Model.extend({
                seller: belongsTo()
            }),

            tableSavedFilters: Model.extend({
                seller: belongsTo()
            }),

            globalTableSetting: Model.extend()
            
        },

        seeds(server) {

            if(getMirageItemsFromLocalStorage()) {
                getMirageItemsFromLocalStorage().forEach((item) => {
                    return server.create(item.model, item.data)
                })
            }
            server.create("notification", {
                title:"Выгрузка товаров успешно завершена",
                description:"Выгрузка товарав но маркетплейс прошла успешно",
                createdAt:"2021-12-13T09:24:10.258Z",
                type:"default",
                extraData:{
                    status:"Success"
                }
            })
            server.create("notification", {
                title:"Ошибка при отправке заявки",
                description:"При отправке заявки произошла непредвиденная ошибка, попробуйте еще раз",
                createdAt:"2021-12-13T09:24:10.258Z",
                type:"action",
                extraData:{
                    data:{
                        message: "Произошла непредвиденная ошибка, попробуйте позже"
                    },
                    status:"Error"
                }
            })
            server.create("notification", {
                title:"Выгрузка товаров успешно завершена",
                description:"Выгрузка товарав но маркетплейс прошла успешно",
                createdAt:"2021-12-13T09:24:10.258Z",
                type:"action",
                extraData:{
                    data:{
                        message: "Выгружено 20 продуктов из 20"
                    },
                    status:"Success"
                }
            })
            let ozon = server.create("market", {
                name: "Ozon"
            })
            let wildberries = server.create("market", {
                name: "Wildberries"
            })
            let sbermegamarket = server.create("market", {
                name: "Sbermegamarket"
            })
            let yandexmarket = server.create("market", {
                name: "Yandexmarket"
            })
            let system = server.create("market", {
                name: "system"
            })
            server.create("field", {
                market: [system, ozon, wildberries, sbermegamarket, yandexmarket], 
                name: "id"
            })
            server.create("field", {
                market: [system, ozon, wildberries, sbermegamarket, yandexmarket], 
                name: "Название"
            })
            server.create("field", {
                market: [system, ozon, wildberries, sbermegamarket, yandexmarket], 
                name: "Артикул"
            })
            server.create("field", {
                market: [system, ozon, wildberries, sbermegamarket, yandexmarket], 
                name: "Объединять по"
            })
            server.create("field", {
                market: [system, ozon, wildberries, sbermegamarket, yandexmarket], 
                name: "Штрих-код"
            })
            server.create("field", {
                market: [system, ozon, wildberries, sbermegamarket, yandexmarket], 
                name: "Высота, мм"
            })
            server.create("field", {
                market: [system, ozon, wildberries, sbermegamarket, yandexmarket], 
                name: "Длина, мм"
            })
            server.create("field", {
                market: [system, ozon, wildberries, sbermegamarket, yandexmarket], 
                name: "Фото"
            })
            server.create("field", {
                market: [system, ozon, wildberries, sbermegamarket, yandexmarket], 
                name: "Бренд"
            })
            server.create("field", {
                market: [system, ozon, wildberries, sbermegamarket, yandexmarket], 
                name: "Производитель"
            })
            server.create("field", {
                market: [system, ozon, wildberries, sbermegamarket, yandexmarket], 
                name: "Страна производства"
            })
            server.create("field", {
                market: [system, ozon, wildberries, sbermegamarket, yandexmarket], 
                name: "Фото 360"
            })

            let systemCategory = server.create("category", {
                market: system,
                name: "ATEN - Переключатели"
            })
            let systemCategory2 = server.create("category", {
                market: system,
                name: "Спреи для волос"
            })
            let ozonCategory = server.create("category", {
                market: ozon,
                name: "3D устройство"
            })
            let wildberriesCategory = server.create("category", {
                market: wildberries,
                name: "DD-кремы"
            })
            let ozonAttr3d1 = server.create("field", {
                market: [ozonCategory],
                name: "3D Изображение"
            })
            let ozonAttr3d2 = server.create("field", {
                market: [ozonCategory],
                name: "Rich-контент JSON"
            })
            server.create("categoryAttribute", {
                category: ozonCategory,
                fields: [ozonAttr3d1, ozonAttr3d2]
            })
            server.create("product", {
                sellerId: "1",
                        id: "1",
                        attributes: [
                            {
                                
                                name: "Название",
                                value: "Чехол для айфон 6"
                            },
                            {
                                
                                name: "Штрих-код",
                                value: "6578938392394"
                            },
                            {
                                
                                name: "Артикул",
                                value: "1234567890"
                            },
                            {
                                
                                name:"Высота, мм",
                                value: "100"
                            },
                            {
                                
                                name: "Бренд",
                                value: "hello world company"
                            },
                            {
                                
                                name: "Производитель",
                                value: "Россия"
                            }
                        ]
                    
            })
            server.create("product", {
                sellerId: "1",
                
                        id: "2",
                        attributes: [
                            {
                            
                                name: "Название",
                                value: "Чехол для айфон 6"
                            },
                            {
                            
                                name: "Штрих-код",
                                value: "6578938392394"
                            },
                            {
                            
                                name: "Артикул",
                                value: "1234567890"
                            },
                            {
                            
                                name:"Высота, мм",
                                value: "100"
                            },
                            {
                            
                                name: "Бренд",
                                value: "hello world company"
                            },
                            {
                            
                                name: "Производитель",
                                value: "Россия"
                            }
                        ]
                  
            })
            server.create("product", {
                sellerId: "1",
               
                        id: "3",
                        attributes: [
                            {
                    
                                name: "Название",
                                value: "Чехол для айфон 6"
                            },
                            {
                    
                                name: "Штрих-код",
                                value: "6578938392394"
                            },
                            {
                    
                                name: "Артикул",
                                value: "1234567890"
                            },
                            {
                    
                                name:"Высота, мм",
                                value: "100"
                            },
                            {
                    
                                name: "Бренд",
                                value: "hello world company"
                            },
                            {
                    
                                name: "Производитель",
                                value: "Россия"
                            }
                        ]
                   
            })
            server.create("product", {
                sellerId: "1",
                
                        id: "4",
                        attributes: [
                            {
                            
                                name: "Название",
                                value: "Чехол для айфон 6"
                            },
                            {
                            
                                name: "Штрих-код",
                                value: "6578938392394"
                            },
                            {
                            
                                name: "Артикул",
                                value: "1234567890"
                            },
                            {
                            
                                name:"Высота, мм",
                                value: "Tyt"
                            },
                            {
                            
                                name: "Бренд",
                                value: "hello world company"
                            },
                            {
                            
                                name: "Производитель",
                                value: "Россия"
                            }
                        ]
                   
            })
            server.create("product", {
                sellerId: "1",
                
                        id: "5",
                        attributes: [
                            {
                    
                                name: "Название",
                                value: "Чехол для айфон 6"
                            },
                            {
                    
                                name: "Штрих-код",
                                value: "6578938392394"
                            },
                            {
                    
                                name: "Артикул",
                                value: "1234567890"
                            },
                            {
                    
                                name:"Высота, мм",
                                value: "100"
                            },
                            {
                    
                                name: "Бренд",
                                value: "hello world company"
                            },
                            {
                    
                                name: "Производитель",
                                value: "Россия"
                            }
                        ]
                    
            })
            server.create("product", {
                sellerId: "1",
                
                        id: "6",
                        attributes: [
                            {
                
                                name: "Название",
                                value: "Чехол для айфон 6"
                            },
                            {
                
                                name: "Штрих-код",
                                value: "6578938392394"
                            },
                            {
                
                                name: "Артикул",
                                value: "1234567890"
                            },
                            {
                
                                name:"Высота, мм",
                                value: "100"
                            },
                            {
                
                                name: "Бренд",
                                value: "hello world company"
                            },
                            {
                
                                name: "Производитель",
                                value: "Россия"
                            }
                        ]
                    
            })
            server.create("product", {
                sellerId: "1",
                
                        id: "7",
                        attributes: [
                            {
    
                                name: "Название",
                                value: "Чехол для айфон 6"
                            },
                            {
    
                                name: "Штрих-код",
                                value: "6578938392394"
                            },
                            {
    
                                name: "Артикул",
                                value: "1234567890"
                            },
                            {
    
                                name:"Высота, мм",
                                value: "100"
                            },
                            {
    
                                name: "Бренд",
                                value: "hello world company"
                            },
                            {
    
                                name: "Производитель",
                                value: "Россия"
                            }
                        ]
                   
            })
            server.create("product", {
                sellerId: "1",
                
                        id: "8",
                        attributes: [
                            {
                                name: "Название",
                                value: "Чехол для айфон 6"
                            },
                            {
                                name: "Штрих-код",
                                value: "6578938392394"
                            },
                            {
                                name: "Артикул",
                                value: "1234567890"
                            },
                            {
                                name:"Высота, мм",
                                value: "100"
                            },
                            {
                                name: "Бренд",
                                value: "hello world company"
                            },
                            {
                                name: "Производитель",
                                value: "Россия"
                            }
                        ]
                    
            })
            server.create("product", {
                sellerId: "1",
                
                        id: "9",
                        attributes: [
                            {
                                name: "Название",
                                value: "Чехол для айфон 6"
                            },
                            {
                                name: "Штрих-код",
                                value: "6578938392394"
                            },
                            {
                                name: "Артикул",
                                value: "1234567890"
                            },
                            {
                                name:"Высота, мм",
                                value: "100"
                            },
                            {
                                name: "Бренд",
                                value: "hello world company"
                            },
                            {
                                name: "Производитель",
                                value: "Россия"
                            }
                        ]
                    
            })
            server.create("product", {
                sellerId: "1",
                
                        id: "10",
                        attributes: [
                            {
                                name: "Название",
                                value: "Чехол для айфон 6"
                            },
                            {
                                name: "Штрих-код",
                                value: "6578938392394"
                            },
                            {
                                name: "Артикул",
                                value: "1234567890"
                            },
                            {
                                name:"Высота, мм",
                                value: "100"
                            },
                            {
                                name: "Бренд",
                                value: "hello world company"
                            },
                            {
                                name: "Производитель",
                                value: "Россия"
                            }
                        ]
                    
            })
            server.create("product", {
                sellerId: "1",
                
                        id: "11",
                        attributes: [
                            {

                                name: "Название",
                                value: "Чехол для айфон 6"
                            },
                            {

                                name: "Штрих-код",
                                value: "6578938392394"
                            },
                            {

                                name: "Артикул",
                                value: "1234567890"
                            },
                            {

                                name:"Высота, мм",
                                value: "100"
                            },
                            {

                                name: "Бренд",
                                value: "hello world company"
                            },
                            {

                                name: "Производитель",
                                value: "Россия"
                            }
                        ]
                   
            })
            server.create("product", {
                sellerId: "1",
                
                        id: "12",
                        attributes: [
                            {
            
                                name: "Название",
                                value: "Чехол для айфон 6"
                            },
                            {
            
                                name: "Штрих-код",
                                value: "6578938392394"
                            },
                            {
            
                                name: "Артикул",
                                value: "1234567890"
                            },
                            {
            
                                name:"Высота, мм",
                                value: "100"
                            },
                            {
            
                                name: "Бренд",
                                value: "hello world company"
                            },
                            {
            
                                name: "Производитель",
                                value: "Россия"
                            }
                        ]
                    
            })
            server.create("product", {
                sellerId: "1",
                
                        id: "13",
                        attributes: [
                            {
                            
                                name: "Название",
                                value: "Чехол для айфон 6"
                            },
                            {
                            
                                name: "Штрих-код",
                                value: "6578938392394"
                            },
                            {
                            
                                name: "Артикул",
                                value: "1234567890"
                            },
                            {
                            
                                name:"Высота, мм",
                                value: "100"
                            },
                            {
                            
                                name: "Бренд",
                                value: "hello world company"
                            },
                            {
                            
                                name: "Производитель",
                                value: "Россия"
                            }
                        ]
                    
            })
            server.create("product", {
                sellerId: "1",
                
                        id: "14",
                        attributes: [
                            {
                
                                name: "Название",
                                value: "Чехол для айфон 6"
                            },
                            {
                
                                name: "Штрих-код",
                                value: "6578938392394"
                            },
                            {
                
                                name: "Артикул",
                                value: "1234567890"
                            },
                            {
                
                                name:"Высота, мм",
                                value: "100"
                            },
                            {
                
                                name: "Бренд",
                                value: "hello world company"
                            },
                            {
                
                                name: "Производитель",
                                value: "Россия"
                            }
                        ]
                    
            })
            server.create("product", {
                sellerId: "1",
                
                        id: "15",
                        attributes: [
                            {
                        
                                name: "Название",
                                value: "Чехол для айфон 6"
                            },
                            {
                        
                                name: "Штрих-код",
                                value: "6578938392394"
                            },
                            {
                        
                                name: "Артикул",
                                value: "1234567890"
                            },
                            {
                        
                                name:"Высота, мм",
                                value: "100"
                            },
                            {
                        
                                name: "Бренд",
                                value: "hello world company"
                            },
                            {
                        
                                name: "Производитель",
                                value: "Россия"
                            }
                        ]
                    
            })

            server.create("globalTableSetting", {
                id: "1",
                columnData: [
                    {
                        Header: "id", accessor: "id", id: "1", sticky: "left"
                    },
                    {
                        Header: "Название", accessor: "attributes.Название", id: "2", sticky: "left"
                    },
                    {
                        Header: "Артикул", accessor: "attributes.Артикул", id: "3"
                    },
                    {
                        Header: "Штрих-код", accessor: "attributes.Штрих-код", id: "4"
                    },
                    {
                        Header: "Высота, мм", accessor: "attributes.Высота, мм", id: "5"
                    },
                    {
                        Header: "Объединять по", accessor: "attributes.Объединять по", id: "6"
                    },
                ],
                settings: {
                    limit: 10,
                    page: 1,
                    filterBy: {
                        data: {
                            combinator: "and",
                            not: false,
                            rules: []
                        }
                    },
                    sortBy: {}
                }
            })
        },

        routes() {
            this.urlPrefix  = "https://lk.market";
            this.namespace = '/api';
            this.passthrough("http://test.api.lk.market/*");
            this.passthrough("https://lk.market/*");
            this.passthrough("http://localhost:8776/*");
            this.passthrough("https://lk-gateway.testdmn.ru/*");
            this.passthrough("https://auth.sell.market/auth/realms/lk.market/protocol/openid-connect/token");
            this.passthrough("https://api.lk.market/api/v2/sellers");

            this.get("/getNotifications", (schema, request) => {
                return schema.notifications.all();
            })

            this.get("/:sellerId/seller-product/categories-for-market/:marketName", async(schema, request) => {
                try {
                    const sellerId = request.params.sellerId;
                
                    if(!sellerId) {
                        throw new Error("Такой seller не доступен");
                    }

                    const marketName = request.params.marketName;

                    if(!marketName) {
                        throw new Error("Имя маркетплейса это обязательный параметр");
                    }

                    const market = schema.markets.findBy({name: marketName});

                    if(!market) {
                        throw new Error("Такого маркетплейса не существует, проверьте правильность введенных данных");
                    } 

                    return market.categories   
                } catch (error) {
                    return new Response(500, {}, {error: error.message});
                }
                
            })
   
            this.get("/:sellerId/seller-product/fields-meta-data-for-market/:marketName", async(schema, request) => {
                try {
                    const sellerId = request.params.sellerId;
                
                    if(!sellerId) {
                        throw new Error("Такой seller не доступен");
                    }

                    const marketName = request.params.marketName;

                    if(!marketName) {
                        throw new Error("Имя маркетплейса это обязательный параметр");
                    }

                    const market = schema.markets.findBy({name: marketName}); 
                    
                    if(!market) {
                        throw new Error("Такого маркетплейса не существует, проверьте правильность введенных данных");
                    } 

                    return market.fields

                } catch (error) {
                    return new Response(500, {}, {error: error.message});
                }
            })

            this.get("/:sellerId/seller-product/fields-meta-data-for-category/:marketName/:dataCategory", async(schema, request) => {
                try {
                    const sellerId = request.params.sellerId;
                
                    if(!sellerId) {
                        throw new Error("Такой seller не доступен");
                    }

                    const marketName = request.params.marketName;
                    const categoryName = request.params.dataCategory;

                    if(!marketName) {
                        throw new Error("Имя маркетплейса это обязательный параметр");
                    }

                    const market = schema.markets.findBy({name: marketName});

                    if(!market) {
                        throw new Error("Такого маркетплейса не существует, проверьте правильность введенных данных");
                    }

                    let category = schema.categories.findBy({name: categoryName});
                    
                    const categoryAttrs = schema.categoryAttributes.findBy({categoryId: category.id});
                    
                    return categoryAttrs && categoryAttrs.fields ? categoryAttrs.fields : {}

                } catch (error) {
                    return new Response(500, {}, {error: error.message});
                }
            })

            this.post("/:sellerId/products", async(schema, request) => {
                try {

                    const body = JSON.parse(request.requestBody);
                    
                    const bodyToCheck = JSON.stringify({filterBy: body.filterBy, sortBy: body.sortBy});

                    const allProducts = [
                        {
                        "sellerId":"1",
                        "id":"1",
                        "attributes":[
                        {
                        "name":"Название",
                        "value":"Чехол для айфон 6"
                        },
                        {
                        "name":"Штрих-код",
                        "value":"6578938392394"
                        },
                        {
                        "name":"Артикул",
                        "value":"65454"
                        },
                        {
                        "name":"Высота, мм",
                        "value":"100"
                        },
                        {
                        "name":"Бренд",
                        "value":"hello world company"
                        },
                        {
                        "name":"Производитель",
                        "value":"Россия"
                        }
                        ]
                        },
                        {
                        "sellerId":"1",
                        "id":"2",
                        "attributes":[
                        {
                        "name":"Название",
                        "value":"Чехол для айфон 6"
                        },
                        {
                        "name":"Штрих-код",
                        "value":"6578938392394"
                        },
                        {
                        "name":"Артикул",
                        "value":"4363456436"
                        },
                        {
                        "name":"Высота, мм",
                        "value":"100"
                        },
                        {
                        "name":"Бренд",
                        "value":"hello world company"
                        },
                        {
                        "name":"Производитель",
                        "value":"Россия"
                        }
                        ]
                        },
                        {
                        "sellerId":"1",
                        "id":"3",
                        "attributes":[
                        {
                        "name":"Название",
                        "value":"Чехол для айфон 6"
                        },
                        {
                        "name":"Штрих-код",
                        "value":"6578938392394"
                        },
                        {
                        "name":"Артикул",
                        "value":"3524534"
                        },
                        {
                        "name":"Высота, мм",
                        "value":"100"
                        },
                        {
                        "name":"Бренд",
                        "value":"hello world company"
                        },
                        {
                        "name":"Производитель",
                        "value":"Россия"
                        }
                        ]
                        },
                        {
                        "sellerId":"1",
                        "id":"4",
                        "attributes":[
                        {
                        "name":"Название",
                        "value":"Чехол для айфон 6"
                        },
                        {
                        "name":"Штрих-код",
                        "value":"6578938392394"
                        },
                        {
                        "name":"Артикул",
                        "value":"90786544"
                        },
                        {
                        "name":"Высота, мм",
                        "value":"Tyt"
                        },
                        {
                        "name":"Бренд",
                        "value":"hello world company"
                        },
                        {
                        "name":"Производитель",
                        "value":"Россия"
                        }
                        ]
                        },
                        {
                        "sellerId":"1",
                        "id":"5",
                        "attributes":[
                        {
                        "name":"Название",
                        "value":"Чехол для айфон 6"
                        },
                        {
                        "name":"Штрих-код",
                        "value":"6578938392394"
                        },
                        {
                        "name":"Артикул",
                        "value":"653353554"
                        },
                        {
                        "name":"Высота, мм",
                        "value":"100"
                        },
                        {
                        "name":"Бренд",
                        "value":"hello world company"
                        },
                        {
                        "name":"Производитель",
                        "value":"Россия"
                        }
                        ]
                        },
                        {
                        "sellerId":"1",
                        "id":"6",
                        "attributes":[
                        {
                        "name":"Название",
                        "value":"Чехол для айфон 6"
                        },
                        {
                        "name":"Штрих-код",
                        "value":"6578938392394"
                        },
                        {
                        "name":"Артикул",
                        "value":"341242354"
                        },
                        {
                        "name":"Высота, мм",
                        "value":"100"
                        },
                        {
                        "name":"Бренд",
                        "value":"hello world company"
                        },
                        {
                        "name":"Производитель",
                        "value":"Россия"
                        }
                        ]
                        },
                        {
                        "sellerId":"1",
                        "id":"7",
                        "attributes":[
                        {
                        "name":"Название",
                        "value":"Чехол для айфон 6"
                        },
                        {
                        "name":"Штрих-код",
                        "value":"6578938392394"
                        },
                        {
                        "name":"Артикул",
                        "value":"74665464354"
                        },
                        {
                        "name":"Высота, мм",
                        "value":"100"
                        },
                        {
                        "name":"Бренд",
                        "value":"hello world company"
                        },
                        {
                        "name":"Производитель",
                        "value":"Россия"
                        }
                        ]
                        },
                        {
                        "sellerId":"1",
                        "id":"8",
                        "attributes":[
                        {
                        "name":"Название",
                        "value":"Чехол для айфон 6"
                        },
                        {
                        "name":"Штрих-код",
                        "value":"6578938392394"
                        },
                        {
                        "name":"Артикул",
                        "value":"1234567890"
                        },
                        {
                        "name":"Высота, мм",
                        "value":"100"
                        },
                        {
                        "name":"Бренд",
                        "value":"hello world company"
                        },
                        {
                        "name":"Производитель",
                        "value":"Россия"
                        }
                        ]
                        },
                        {
                        "sellerId":"1",
                        "id":"9",
                        "attributes":[
                        {
                        "name":"Название",
                        "value":"Чехол для айфон 6"
                        },
                        {
                        "name":"Штрих-код",
                        "value":"6578938392394"
                        },
                        {
                        "name":"Артикул",
                        "value":"1234567890"
                        },
                        {
                        "name":"Высота, мм",
                        "value":"100"
                        },
                        {
                        "name":"Бренд",
                        "value":"hello world company"
                        },
                        {
                        "name":"Производитель",
                        "value":"Россия"
                        }
                        ]
                        },
                        {
                        "sellerId":"1",
                        "id":"10",
                        "attributes":[
                        {
                        "name":"Название",
                        "value":"Чехол для айфон 6"
                        },
                        {
                        "name":"Штрих-код",
                        "value":"6578938392394"
                        },
                        {
                        "name":"Артикул",
                        "value":"1234567890"
                        },
                        {
                        "name":"Высота, мм",
                        "value":"100"
                        },
                        {
                        "name":"Бренд",
                        "value":"hello world company"
                        },
                        {
                        "name":"Производитель",
                        "value":"Россия"
                        }
                        ]
                        },
                        {
                        "sellerId":"1",
                        "id":"11",
                        "attributes":[
                        {
                        "name":"Название",
                        "value":"Чехол для айфон 6"
                        },
                        {
                        "name":"Штрих-код",
                        "value":"6578938392394"
                        },
                        {
                        "name":"Артикул",
                        "value":"1234567890"
                        },
                        {
                        "name":"Высота, мм",
                        "value":"100"
                        },
                        {
                        "name":"Бренд",
                        "value":"hello world company"
                        },
                        {
                        "name":"Производитель",
                        "value":"Россия"
                        }
                        ]
                        },
                        {
                        "sellerId":"1",
                        "id":"12",
                        "attributes":[
                        {
                        "name":"Название",
                        "value":"Чехол для айфон 6"
                        },
                        {
                        "name":"Штрих-код",
                        "value":"6578938392394"
                        },
                        {
                        "name":"Артикул",
                        "value":"1234567890"
                        },
                        {
                        "name":"Высота, мм",
                        "value":"100"
                        },
                        {
                        "name":"Бренд",
                        "value":"hello world company"
                        },
                        {
                        "name":"Производитель",
                        "value":"Россия"
                        }
                        ]
                        },
                        {
                        "sellerId":"1",
                        "id":"13",
                        "attributes":[
                        {
                        "name":"Название",
                        "value":"Чехол для айфон 6"
                        },
                        {
                        "name":"Штрих-код",
                        "value":"6578938392394"
                        },
                        {
                        "name":"Артикул",
                        "value":"1234567890"
                        },
                        {
                        "name":"Высота, мм",
                        "value":"100"
                        },
                        {
                        "name":"Бренд",
                        "value":"hello world company"
                        },
                        {
                        "name":"Производитель",
                        "value":"Россия"
                        }
                        ]
                        },
                        {
                        "sellerId":"1",
                        "id":"14",
                        "attributes":[
                        {
                        "name":"Название",
                        "value":"Чехол для айфон 6"
                        },
                        {
                        "name":"Штрих-код",
                        "value":"6578938392394"
                        },
                        {
                        "name":"Артикул",
                        "value":"1234567890"
                        },
                        {
                        "name":"Высота, мм",
                        "value":"100"
                        },
                        {
                        "name":"Бренд",
                        "value":"hello world company"
                        },
                        {
                        "name":"Производитель",
                        "value":"Россия"
                        }
                        ]
                        },
                        {
                        "sellerId":"1",
                        "id":"15",
                        "attributes":[
                        {
                        "name":"Название",
                        "value":"Чехол для айфон 6"
                        },
                        {
                        "name":"Штрих-код",
                        "value":"6578938392394"
                        },
                        {
                        "name":"Артикул",
                        "value":"1234567890"
                        },
                        {
                        "name":"Высота, мм",
                        "value":"100"
                        },
                        {
                        "name":"Бренд",
                        "value":"hello world company"
                        },
                        {
                        "name":"Производитель",
                        "value":"Россия"
                        }
                        ]
                        }
                    ]
                    
                    const filterByArticulData = [
                        {
                            "sellerId":"1",
                            "id":"5",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 6"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"653353554"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"6",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 6"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"341242354"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"7",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 6"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"74665464354"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"8",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 6"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"9",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 6"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"10",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 7"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"11",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 8"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"12",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 10"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"13",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 11"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"14",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 12"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"15",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 13"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            }
                    ]

                    const filterByArticulAndIdData = [
                        {
                            "sellerId":"1",
                            "id":"10",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 7"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"11",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 8"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"12",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 10"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"13",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 11"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"14",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 12"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"15",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 13"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                        ]
                    }
                    ]

                    const filterByArtiucelAndIdAndNameData = [
                        {
                            "sellerId":"1",
                            "id":"14",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 12"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                    ]

                    const sortArticulByDescData = [
                        {
                            "sellerId":"1",
                            "id":"1",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 6"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"65454"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
    ]
    },
    {
                            "sellerId":"1",
                            "id":"3",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 6"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"3524534"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                           },
    {
                            "sellerId":"1",
                            "id":"4",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 6"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"90786544"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"Tyt"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
    {
                            "sellerId":"1",
                            "id":"6",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 6"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"341242354"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
    {
                            "sellerId":"1",
                            "id":"5",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 6"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"653353554"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
    {
                            "sellerId":"1",
                            "id":"8",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 6"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"9",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 6"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"10",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 6"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"11",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 6"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"12",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 6"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"13",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 6"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"14",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 6"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                            "sellerId":"1",
                            "id":"15",
                            "attributes":[
                            {
                            "name":"Название",
                            "value":"Чехол для айфон 6"
                            },
                            {
                            "name":"Штрих-код",
                            "value":"6578938392394"
                            },
                            {
                            "name":"Артикул",
                            "value":"1234567890"
                            },
                            {
                            "name":"Высота, мм",
                            "value":"100"
                            },
                            {
                            "name":"Бренд",
                            "value":"hello world company"
                            },
                            {
                            "name":"Производитель",
                            "value":"Россия"
                            }
                            ]
                            },
                            {
                                "sellerId":"1",
                                "id":"2",
                                "attributes":[
                                {
                                "name":"Название",
                                "value":"Чехол для айфон 6"
                                },
                                {
                                "name":"Штрих-код",
                                "value":"6578938392394"
                                },
                                {
                                "name":"Артикул",
                                "value":"4363456436"
                                },
                                {
                                "name":"Высота, мм",
                                "value":"100"
                                },
                                {
                                "name":"Бренд",
                                "value":"hello world company"
                                },
                                {
                                "name":"Производитель",
                                "value":"Россия"
                                }
                                ]
                                },
        {
                                "sellerId":"1",
                                "id":"7",
                                "attributes":[
                                {
                                "name":"Название",
                                "value":"Чехол для айфон 6"
                                },
                                {
                                "name":"Штрих-код",
                                "value":"6578938392394"
                                },
                                {
                                "name":"Артикул",
                                "value":"74665464354"
                                },
                                {
                                "name":"Высота, мм",
                                "value":"100"
                                },
                                {
                                "name":"Бренд",
                                "value":"hello world company"
                                },
                                {
                                "name":"Производитель",
                                "value":"Россия"
                                }
                                ]
                                }
                    ]

                    const sellerId = request.params.sellerId;

                    if(!sellerId) {
                        throw new Error("Такой seller не доступен");
                    }

                    const limit = body.limit;
                    const page = body.page
                    const skip = (page - 1) * limit;

                    const filterByArticul =`{"filterBy":{id: "-","name":"123","data":{"combinator":"and","not":false,"rules":[{id: "-","field":"Артикул","operator":">","valueSource":"value","value":"90786544"}]}},"sortBy":{}}`;
                    const filterByArticulAndId = `{"filterBy":{id: "-","name":"123","data":{"combinator":"and","not":false,"rules":[{id: "-","field":"Артикул","operator":">","valueSource":"value","value":"90786544"},{"value":"1",id: "-","field":"id","valueSource":"value","operator":"contains"}]}},"sortBy":{}}`
                    const filterByArticulAndIdAndName = `{"filterBy":{id: "-","name":"123","data":{"combinator":"and","not":false,"rules":[{id: "-","field":"Артикул","operator":">","valueSource":"value","value":"90786544"},{"value":"1",id: "-","field":"id","valueSource":"value","operator":"contains"},{id: "-","rules":[{id: "-","field":"Название","operator":"=","valueSource":"value","value":"Чехол для айфон 12"}],"combinator":"and","not":false}]}},"sortBy":{}}`
                    const sortArticulByDesc = `{"filterBy":{"data":{"combinator":"and","not":false,"rules":[]}},"sortBy":{"columnHeader":"Артикул","sortIndex":"desc"}}`

                    const regexId = /"id":\s?"[^"]+"/gimu;
                    const subst = `id: "-"`;
                    const replacedRequest = bodyToCheck.replace(regexId, subst);

                    function getDataByRequest(replacedRequest) {
                        switch (replacedRequest) {
                            case filterByArticul:
                                return filterByArticulData
                        
                            case filterByArticulAndId: 
                                return filterByArticulAndIdData

                            case filterByArticulAndIdAndName:
                                return filterByArtiucelAndIdAndNameData

                            case sortArticulByDesc:
                                return sortArticulByDescData

                            default: return allProducts
                        }   
                    }

                    return {
                        limit: limit,
                        total: allProducts.length,
                        products: getDataByRequest(replacedRequest).slice(skip, page * limit)
                    }
                } catch (error) {
                    return new Response(403, {}, {error: error.message});
                }
            })

            this.patch("/:sellerId/change-product", async(schema, request) => {
                try {
                    const sellerId = request.params.sellerId;

                    if(!sellerId) {
                        throw new Error("Такой seller не доступен");
                    }
    
                    let newAttrs = JSON.parse(request.requestBody);
                    let product = schema.products.find(newAttrs.id);
    
                    product.update({sellerId: sellerId, id: newAttrs.id, attributes: [...newAttrs.attributes]});
                    updateMirageItemFromLocalStorage({data: { sellerId: sellerId, id: newAttrs.id, attributes: [...newAttrs.attributes] }, model: "product"})

                    return { message: "Продукт успешно обновлен" }
                } catch (error) {
                    return new Response(500, {}, {error: error.message});
                }
            })

            this.post("/:sellerId/save-table-settings", async(schema,request) => {
                const sellerId = request.params.sellerId;

                const data = JSON.parse(request.requestBody)

                if(!sellerId) {
                    throw new Error("Такой seller не доступен");
                }

                const tableSettings = schema.tableSettings.findBy({sellerId: sellerId});

                if(tableSettings) {
                    tableSettings.update({sellerId: sellerId, id: tableSettings.attrs.id, settings: data.settings, columnData: data.columnData})
                    updateMirageItemFromLocalStorage({data: { sellerId: sellerId, settings: data.settings, columnData: data.columnData }, model: "tableSetting"})
                } else {
                    await server.create("tableSetting", { sellerId: sellerId, settings: data.settings, columnData: data.columnData });
                    setMirageItemToLocalStorage({data: { sellerId: sellerId, settings: data.settings, columnData: data.columnData }, model: "tableSetting"})
                }
                
            })

            this.get("/:sellerId/get-global-table-settings", async(schema, request) => {
                try {
                    const sellerId = request.params.sellerId;

                    if(!sellerId) {
                        throw new Error("Такой seller не доступен");
                    }

                    const globalSettings = schema.globalTableSettings.all();

                    return globalSettings.models[0].attrs
                } catch (error) {
                    return new Response(500, {}, {error: error.message});
                }
            })

            this.get("/:sellerId/get-table-settings", async(schema,request) => {
                try {
                    const sellerId = request.params.sellerId;

                    if(!sellerId) {
                        throw new Error("Такой seller не доступен");
                    }
    
                    const tableSettings = schema.tableSettings.findBy({sellerId: sellerId});

                    return tableSettings ? tableSettings : {}
                } catch (error) {
                    return new Response(403, {}, {error: error.message});
                }

            })

            this.get("/:sellerId/get-report-settings", async(schema,request) => {
                try {
                    const sellerId = request.params.sellerId;

                    if(!sellerId) {
                        throw new Error("Такой seller не доступен");
                    }
    
                    const tableSettings = schema.reportSettings.findBy({sellerId: sellerId});

                    return tableSettings ? tableSettings : {}
                } catch (error) {
                    return new Response(403, {}, {error: error.message});
                }

            })

            this.post("/:sellerId/delete-product", async(schema,request) => {
                try {
                    const sellerId = request.params.sellerId;

                    if(!sellerId) {
                        throw new Error("Такой seller не доступен");
                    }

                    const products = JSON.parse(request.requestBody);

                    if(Array.isArray(products)) {
                        const AllProductsById = schema.products.where({ sellerId: sellerId });
                        let filteredArray = AllProductsById;
                        products.forEach((obj) => {
                            filteredArray = filteredArray.filter(item => {
                                return item.attrs.id !== obj.id
                            })
                        })
                        filteredArray.save();
                    } else {
                        const productToDelete = schema.products.where({ id: products.id });
                        productToDelete.destroy();
                    }

                    return "Продукт успешно удален"

                } catch (error) {
                    return new Response(500, {}, {error: error.message});
                }
            })

            this.post("/:sellerId/create-table-filter", async(schema, request) => {
                try {
                    const sellerId = request.params.sellerId;

                    if(!sellerId) {
                        throw new Error("Такой seller не доступен");
                    }

                    const data = JSON.parse(request.requestBody);

                    await server.create("tableSavedFilter", {sellerId: sellerId, ...data});
                    setMirageItemToLocalStorage({data: {sellerId: sellerId, ...data}, model: "tableSavedFilter"});

                    return "Фильтр успешно сохранен"
                } catch (error) {
                    return new Response(500, {}, {error: error.message});
                }
            })

            this.get("/:sellerId/get-saved-table-filters", async(schema, request) => {
                try {
                    const sellerId = request.params.sellerId;

                    if(!sellerId) {
                        throw new Error("Такой seller не доступен");
                    }

                    const tableSavedFilters = schema.tableSavedFilters.where({sellerId: sellerId});

                    return tableSavedFilters

                } catch (error) {
                    return new Response(403, {}, {error: error.message});
                }
            })

            this.patch("/:sellerId/change-saved-table-filter", async(schema, request) => {
                try {
                    const sellerId = request.params.sellerId;

                    if(!sellerId) {
                        throw new Error("Такой seller не доступен");
                    }

                    const newFilter = JSON.parse(request.requestBody);

                    const filter = schema.tableSavedFilters.findBy({id: newFilter.id});
                        
                    if(filter) {
                        filter.update({name: newFilter.name, id: newFilter.id, data: {...newFilter.data}, sellerId: sellerId});

                        updateMirageItemFromLocalStorage({data: { ...newFilter, sellerId: sellerId }, model: "tableSavedFilter"});
                    }

                    return "Фильтр успешно сохранен"

                } catch (error) {
                    return new Response(500, {}, {error: error.message});
                }
            })

            this.post("/:sellerId/delete-saved-table-filter", async(schema, request) => {
                try {
                    const sellerId = request.params.sellerId;

                    if(!sellerId) {
                        throw new Error("Такой seller не доступен");
                    }

                    const filterToDelete = JSON.parse(request.requestBody);

                    const filter = schema.tableSavedFilters.findBy({id: filterToDelete.id});

                    if(filter) {
                        filter.destroy();
                        deleteMirageItemFromLocalStorage({data: {...filterToDelete, sellerId: sellerId}, model: "tableSavedFilter"})
                    }

                    return "Фильтр успешно удален"

                } catch (error) {
                    return new Response(500, {}, {error: error.message});
                }
            })

        },
}

    