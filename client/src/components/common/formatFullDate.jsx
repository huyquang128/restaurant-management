function formatFullDate(date) {
    const setDate = new Date(date);
    return setDate.toLocaleString('vi-VN');
}

export default formatFullDate;
