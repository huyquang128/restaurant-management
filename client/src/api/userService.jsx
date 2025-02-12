const userService = (axiosPrivate) => ({
    getUserByIdApi: async (id) => {
        try {
            const response = await axiosPrivate.get(
                `/user/get-user-by-id/${id}`
            );

            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
});

export default userService;
