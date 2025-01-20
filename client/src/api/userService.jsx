


export const getUserByIdApi = async (formData) => {
    try {
        const response = await formData.result.get(
            `/user/get-user-by-id/${formData.id}`
        );

        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};
