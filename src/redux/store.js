import { configureStore } from '@reduxjs/toolkit';

import customerSlice from './customerSlice';

export default configureStore({
    reducer: {
        customer: customerSlice,
    },
});
