function removeVietnameseTonesCommon(str) {
    return str
        .normalize('NFD') // Tách dấu khỏi ký tự
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu
        .replace(/đ/g, 'd') // Thay đ
        .replace(/Đ/g, 'D') // Thay Đ
        .replace(/[^a-zA-Z0-9\s]/g, '') // Loại ký tự đặc biệt
        .replace(/\s+/g, '-') // Thay khoảng trắng thành -
        .toLowerCase();
}

module.exports = removeVietnameseTonesCommon;
