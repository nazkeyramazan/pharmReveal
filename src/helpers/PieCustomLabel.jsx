export const RenderCustomLabel = ({ percent, x, y, name }) => {
    return (
        <text
            x={x}
            y={y}
            fill="#000"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={18}
            fontWeight="bold"
        >
            {`${(percent * 100).toFixed(1)}%`}
        </text>
    );
};