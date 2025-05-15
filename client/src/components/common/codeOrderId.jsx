function codeOrderId(orderId) {
    const numericCode = orderId.replace(/\D/g, ''); // => "680358840511668"

    // Có thể cắt ngắn lại nếu cần:
    const orderCode = numericCode.slice(0, 8); // Ví dụ: "68035884"
    return `QNBO-${orderCode}`;
}

export default codeOrderId;
