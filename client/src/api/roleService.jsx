import { axiosInstancePublic } from './axiosInstance';

// api public (don't verify token)
export const getRoleUserApi = async () => {
    try {
        const response = await axiosInstancePublic.get('/role/get-role-user');
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const getAllRoleApi = async () => {
    try {
        const response = await axiosInstancePublic.get('/role/get-all-role');
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const getRoleNameApi = async (name) => {
    try {
        const response = await axiosInstancePublic.get(
            `/role/get-role-name/${name}`
        );
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const updatePermessionsApi = async (roleId, permissions) => {
    try {
        const response = await axiosInstancePublic.patch(
            `/role/update-permessions-role/${roleId}`,
            {
                permissions,
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};
