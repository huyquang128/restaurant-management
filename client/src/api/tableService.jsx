//api public

//api private
const tablePrivate = (axiosPrivate) => ({
    updateStatusTableApi: async (tableId, status, orderId) => {
        const response = await axiosPrivate.patch(
            `/table/update-status-table/${tableId}`,
            { status, orderId }
        );
        return response.data;
    },

    updateStatusTableWhenInUseApi: async (tableId) => {
        const response = await axiosPrivate.patch(
            `/table/update-status-in-use-table/${tableId}`
        );
        return response.data;
    },

    deleteSetTableApi: async (tableId, orderId) => {
        const response = await axiosPrivate.delete(
            `/table/delete-set-table/${tableId}`,
            {
                data: { orderId },
            }
        );
        return response.data;
    },
});

export default tablePrivate;
