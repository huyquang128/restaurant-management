import { axiosInstancePublic } from './axiosInstance';

// api public ( do not verify token)
export const getAllNotificationTypeAdminApi = async () => {
    const response = await axiosInstancePublic.get(
        '/notification/get-notification-admin'
    );
    return response.data;
};

export const setAllNotifyReadedApi = async () => {
    const response = await axiosInstancePublic.patch(
        '/notification/set-all-notify-readed'
    );
    return response.data;
};

export const setNotifySingleReadedApi = async (id) => {
    const response = await axiosInstancePublic.patch(
        `/notification/set-single-notify-readed/${id}`
    );
    return response.data;
};

export const deleteNotifySingleApi = async (id) => {
    const response = await axiosInstancePublic.delete(
        `/notification/delete-single-notify/${id}`
    );
    return response.data;
};
