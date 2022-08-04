import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid';

export const sendFormToLocalStorage = (data) => {
    if (!data.localStorageName) {
        let prevIndex = localSorageDataNextIndex();
        localStorage.setItem(`setFormEvent${prevIndex}`,
            JSON.stringify(
                {
                    title: "Ошибка при отправке заявки",
                    description: "При отправке заявки произошла непредвиденная ошибка, попробуйте еще раз",
                    createdAt: (new Date).toISOString(),
                    type: "action",
                    extraData: {
                        data: { ...data },
                        localStorageName: `setFormEvent${prevIndex}`,
                    },
                    iconType: "warning",
                    id: uuidv4()
                }
            ))
    }
}

export const isFormDataInLocalStorage = () => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith("setFormEvent"));
    return keys.length > 0
}

export const localSorageDataNextIndex = () => {
    const arrayOfData = Object.keys(localStorage).filter(key => key.startsWith("setFormEvent"));
    let indexes;
    if(arrayOfData.length > 0) {
        indexes = arrayOfData.map((dataName) => {
              return parseInt(dataName.replace("setFormEvent", "")) + 1
        });
    } else {
        return 0
    }
    return Math.max.apply(null, indexes);
}

// utils to simulate db for miragejs 

export const setMirageItemToLocalStorage = (item) => {
    if(localStorage.getItem("mirageDB") !== null) {
        let items = JSON.parse(localStorage.getItem("mirageDB"));
        items = [...items, item];
        localStorage.setItem("mirageDB", JSON.stringify(items));
    } else {
        localStorage.setItem("mirageDB", JSON.stringify([item]));
    }
}

export const getMirageItemsFromLocalStorage = () => {
    if(localStorage.getItem("mirageDB") !== null) {
        return JSON.parse(localStorage.getItem("mirageDB"));
    } else {
        return false;
    }
}

export const updateMirageItemFromLocalStorage = (data) => {
    if(localStorage.getItem("mirageDB") !== null) {
        const items = JSON.parse(localStorage.getItem("mirageDB"));
        const arrWithoutOldItem = items.filter(item =>  item.model !== data.model || (item.model === data.model && item.data.userId !== data.data.userId || item.data.id !== data.data.id));
        localStorage.setItem("mirageDB", JSON.stringify([...arrWithoutOldItem, data]));
    } else {
        localStorage.setItem("mirageDB", JSON.stringify([data]));
    }
}

// now deleting just saved filters in table

export const deleteMirageItemFromLocalStorage = (data) => {
    if(localStorage.getItem("mirageDB") !== null ) {
        const items = JSON.parse(localStorage.getItem("mirageDB"));
        const itemsWithoutataModel = items.filter(item => item.model !== data.model);
        const filteredItems = items.filter(item => item.model === data.model && item.data.id !== data.data.id);
        localStorage.setItem("mirageDB", JSON.stringify([...itemsWithoutataModel, ...filteredItems]))
    } else {
        localStorage.setItem("mirageDB", JSON.stringify([data]))
    }
}

// userDto save to localstorage helper

export const removeUserDtoFormStorage = () => {
    Cookies.remove("jwt_access", { domain: process.env.REACT_APP_COOKIE_DOMAIN });
    Cookies.remove("jwt_refresh", { domain: process.env.REACT_APP_COOKIE_DOMAIN });
    Cookies.remove("currentUserId", { domain: process.env.REACT_APP_COOKIE_DOMAIN });
}

// users saved accounts helper

export const savedUserAccountsHandler = (data) => {
    let accounts = JSON.parse(localStorage.getItem("savedAccounts"));
    if(!accounts) {
        localStorage.setItem("savedAccounts", JSON.stringify([]));
    } else {
        let arrWithoutOldItem = accounts.filter(item => item.id !== data.id);
        localStorage.setItem("savedAccounts", JSON.stringify([...arrWithoutOldItem, data]))
        return [...arrWithoutOldItem, data];
    }
}


export const removeUserSavedAccounts = (data) => {
    if(localStorage.getItem("savedAccounts")) {
        const items = JSON.parse(localStorage.getItem("savedAccounts"));
        const newItems = items.filter(item => item.id !== data.id);
        localStorage.setItem("savedAccounts", JSON.stringify(newItems));
        return newItems
    }
}

export const deleteSavedAccount = (id) => {
    const accounts = JSON.parse(localStorage.getItem("savedAccounts"));
    if(accounts) {
        const arrWithoutOldItem = accounts.filter(item => item.id !== id);
        localStorage.setItem("savedAccounts", JSON.stringify(arrWithoutOldItem));
        clearUserCookieData(id)
    }
}

export const removeCurrentSeller = () => {
    localStorage.removeItem("currentSeller");
}

export const clearUserCookieData = (id) => {
    const currentUserId = Cookies.get("currentUserId");
    if(currentUserId === id) {
        Cookies.remove("currentUserId");
        Cookies.remove("jwt_access");
        Cookies.remove("jwt_refresh");
    }
}
