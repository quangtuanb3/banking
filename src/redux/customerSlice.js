import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { customerService } from '../services/customerService';


export const fetchAllCustomers = createAsyncThunk(
    'customer/fetchAllCustomers',
    async () => {
        const response = await customerService.getAll();
        return response.data;
    }
);

export const fetchCustomerById = createAsyncThunk(
    'customer/fetchCustomerById',
    async (id) => {
        const response = await customerService.getCustomerById(id);
        return response.data;
    }
);

export const createCustomer = createAsyncThunk(
    'customer/createCustomer',
    async (data) => {
        const response = await customerService.create(data);
        return response.data;
    }
);

export const updateCustomer = createAsyncThunk('customer/updateCustomer',
    async (data) => {
        const response = await customerService.update(data);
        return response.data;
    });

export const deleteCustomerById = createAsyncThunk('customer/deleteCustomerById',
    async (id) => {
        const response = await customerService.deleteCustomerById(id);
        return response.data;
    });


export const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        data: [],
        deposit: 0,
        withdraw: 0,
        currentCustomer: {
            fullName: "",
            email: "",
            phone: "",
            address: [],
            balance: 0,
        },
    },
    reducers: {
        changeCustomer: (state, action) => {
            const obj = action.payload;
            const key = Object.keys(obj);
            const value = obj[key];

            state.currentCustomer[key] = value;
        },
        changeDeposit: (state, action) => {
            state.deposit = action.payload;
        },
        changeWithdraw: (state, action) => {
            state.withdraw = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchAllCustomers.fulfilled, (state, action) => {
            state.data = action.payload;
        });

        builder.addCase(fetchCustomerById.fulfilled, (state, action) => {
            state.currentCustomer = action.payload;
        });

        builder.addCase(deleteCustomerById.fulfilled, (state, action) => {
            const deletedCustomerId = action.meta.arg;
            state.data = state.data.filter(p => p.id !== deletedCustomerId);
            // Use toast notification or modal for better user experience
            // For example:
        });


        builder.addCase(createCustomer.fulfilled, (state, action) => {
            state.data.unshift(action.payload);
        });

        // builder.addCase(createNewProduct.rejected, (state, action) => {

        //     (() => {
        //         toast.error("Create fail", {
        //             autoClose: 700,
        //         });
        //     })();
        // });


        builder.addCase(updateCustomer.fulfilled, (state, action) => {
            state.data = state.data.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
        });

        // builder.addCase(updateProduct.rejected, (state, action) => {

        //     (() => {
        //         toast.error("Update fail", {
        //             autoClose: 700,
        //         });
        //     })();
        // });

    },
});

// Action creators are generated for each case reducer function
export const {
    changeCustomer,
    changeDeposit,
    changeWithdraw
} = customerSlice.actions;

export default customerSlice.reducer;
