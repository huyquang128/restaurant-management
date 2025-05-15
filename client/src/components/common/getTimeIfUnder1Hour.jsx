import { differenceInMinutes } from 'date-fns';

export const getTimeIfUnder1Hour = (createdAt) => {
    const now = new Date();
    const past = new Date(createdAt);

    return differenceInMinutes(now, past) < 60;
};
