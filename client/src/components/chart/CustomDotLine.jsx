/* eslint-disable react/prop-types */
function CustomDotLine(props) {
    const { cx, cy, stroke, payload, value, points, index, data } = props;

    if (index === 0 || index === points.length - 1) return null;

    // Tách gradient id từ stroke: e.g. stroke="url(#gradientRenvenue)" → "gradientRenvenue"
    const gradientId = stroke?.match(/url\(#(.*)\)/)?.[1];

    return (
        <circle
            cx={cx}
            cy={cy}
            r={4}
            fill={`#fff`} // dùng linear gradient làm fill
            stroke={`url(#${gradientId})`}
            strokeWidth={3}
        />
    );
}

export default CustomDotLine;
