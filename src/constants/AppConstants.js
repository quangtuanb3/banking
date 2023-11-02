
import { object, string, number, date, array } from 'yup';

export const SERVER_API = 'http://localhost:3300';
// export const SERVER_API = 'https://json-server-vercel-8am8e4iu6-quang-tuans-projects.vercel.app';

export const CUSTOMER_API = SERVER_API + '/customers';


export const CUSTOMER_VALIDATOR_SCHEMA = object().shape({
    fullName: string().required('Name is required'),
    email: string().required('Email is required'),
    phone: string().required('Phone is required'),
    address: string().required('Address is required'),
});

export const DEPOSIT_VALIDATOR_SCHEMA = object().shape({
    // deposit: number()
    //     .required('Amount is required')
    //     .min(10000, 'Transaction amount must be at least 10000')
    //     .max(10000000, 'Transaction amount cannot exceed 10000000')
    //     .integer('Transaction amount must be an integer'),
});

export const WITHDRAW_VALIDATOR_SCHEMA = object().shape({
    // deposit: number()
    //     .required('Amount is required')
    //     .min(10000, 'Transaction amount must be at least 10000')
    //     .max(10000000, 'Transaction amount cannot exceed 10000000')
    //     .integer('Transaction amount must be an integer'),
});