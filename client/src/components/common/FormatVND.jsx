function FormatVND(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
}

export default FormatVND;
