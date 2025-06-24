import React from "react";

export const CustomTick = ({ x, y, payload }) => {
    const text = payload.value || "";
    const maxCharsPerLine = 8;

    // Разбиваем текст на куски по 9 символов
    const lines = [];
    for (let i = 0; i < 3; i++) {
        const part = text.slice(i * maxCharsPerLine, (i + 1) * maxCharsPerLine);
        if (part) lines.push(part);
    }

    // Добавляем троеточие, если текст слишком длинный
    if (text.length > maxCharsPerLine * 3) {
        lines[2] = lines[2].slice(0, maxCharsPerLine - 1) + '…';
    }

    return (
        <g transform={`translate(${x},${y})`}>
            {lines.map((line, index) => (
                <text
                    key={index}
                    x={0}
                    y={index * 12}
                    dy={16}
                    textAnchor="middle"
                    fill="#666"
                    fontSize={10}
                >
                    {line}
                </text>
            ))}
        </g>
    );
};
