/* eslint-disable react/prop-types */
function CustomDotActiveLine(props) {
    const { cx, cy } = props;
    return (
        <circle
            cx={cx}
            cy={cy}
            r={6} // Kích thước chấm
            fill="#fff" // Màu chấm
            stroke="#FF69B4" // Màu viền
            strokeWidth={4} // Độ dày viền
            style={{ cursor: 'pointer' }}
        >
            {/* Hiển thị giá trị ngay trên chấm */}
            {/* <title>{value}</title> */}
        </circle>
    );
}

export default CustomDotActiveLine;
