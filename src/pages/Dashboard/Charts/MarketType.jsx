import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import {exportToExcelCharts} from "../../../helpers/exportToExcel";
import ExcelIcon from "../../../assets/excel-icon.png";
import {RenderCustomLabel} from "../../../helpers/PieCustomLabel";
import {renderCustomLegend} from "../../../helpers/PieCustomLegend";


const COLORS = ["#135d31", "#fb6f5e", "#74C365", "#f39c12", "#95a5a6"];

const MarketTypeChart = ({data}) => {
    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <h3 style={styles.title}>Market Types</h3>
                <button onClick={() => exportToExcelCharts(data)} style={{border: "none"}}>
                    <img src={ExcelIcon} alt="Excel Icon" style={styles.icon}/></button>
            </div>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="totalValueInPercent"
                            nameKey="companyName"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            labelLine={false}
                            label={<RenderCustomLabel/>}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                            ))}
                        </Pie>
                        <Tooltip/>
                        <Legend content={renderCustomLegend} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            );
            };

            const styles = {
            wrapper: {
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 0 10px rgba(0,0,0,0.05)",
        },
            title: {
            marginBottom: 10,
            color: "#333",
        },
            container: {
            display: "flex",
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
            icon: {
            width: "25px",
            height: "25px",
            cursor: "pointer",
        },
        };

            export default MarketTypeChart;
