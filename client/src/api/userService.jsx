const userService = (axiosPrivate) => ({
    getUserByIdApi: async (id) => {
        const response = await axiosPrivate.get(`/user/get-user-by-id/${id}`);
        return response.data;
    },

    getAllUserRoleApi: async () => {
        const response = await axiosPrivate.get(`/user/get-all-user-role`);
        return response.data;
    },

    getUserPageApi: async (page) => {
        const response = await axiosPrivate.get(`/user/get-user-page`, {
            params: {
                page,
            },
        });

        return response.data;
    },

    getAllStaffRoleApi: async () => {
        const response = await axiosPrivate.get(`/user/get-all-staff-role`);
        return response.data;
    },

    getStaffPageApi: async (page) => {
        const response = await axiosPrivate.get(`/user/get-staff-page`, {
            params: {
                page,
            },
        });

        return response.data;
    },

    addStaffApi: async (formData) => {
        const response = await axiosPrivate.post(`/user/add-staff`, formData);

        return response.data;
    },

    deleteUsersApi: async (userIds) => {
        const response = await axiosPrivate.get(`/user/remove-user`, {
            data: { userIds },
        });

        return response.data;
    },
});

export default userService;
