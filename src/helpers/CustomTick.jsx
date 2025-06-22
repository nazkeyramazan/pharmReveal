import React from "react";

// Кастомный компонент для XAxis
export const CustomTick = ({ x, y, payload }) => {
    const words = payload.value.length > 12
        ? [payload.value.slice(0, 12), payload.value.slice(12, 24)]
        : [payload.value];

    return (
        <g transform={`translate(${x},${y})`}>
            {words.map((line, index) => (
                <text
                    key={index}
                    x={0}
                    y={index * 12}
                    dy={16}
                    textAnchor="middle"
                    fill="#666"
                    fontSize={12}
                >
                    {line}
                </text>
            ))}
        </g>
    );
};
