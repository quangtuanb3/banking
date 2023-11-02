import axios from "axios";

import { CUSTOMER_API, SERVER_API } from '../constants/AppConstants';

export const customerService = {
    getAll: () => {
        return axios.get(CUSTOMER_API + '?_sort=id&_order=desc');
    },
    getCustomerById: (id) => {
        return axios.get(CUSTOMER_API + '/' + id);
    },
    deleteCustomerById: (id) => {
        return axios.delete(CUSTOMER_API + '/' + id);
    },
    create: (data) => {
        return axios.post(CUSTOMER_API, data);
    },
    update: (data) => {
        return axios.patch(CUSTOMER_API + '/' + data.id, data);
    },
    createTransfer: (data) => {
        return axios.post(SERVER_API + '/transfer', data);
    },
    getAllTransfer: () => {
        return axios.get(SERVER_API + '/transfer');
    }
}

