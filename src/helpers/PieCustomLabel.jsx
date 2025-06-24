export const RenderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    // Увеличиваем расстояние от центра — например, +15 пикселей к outerRadius
    const radius = outerRadius + 21;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="#000"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={16}
            fontWeight="bold"
        >
            {`${(percent * 100).toFixed(1)}%`}
        </text>
    );
};