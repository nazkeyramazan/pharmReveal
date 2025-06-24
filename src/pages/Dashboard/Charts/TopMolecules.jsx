import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import {exportToExcelCharts} from "../../../helpers/exportToExcel";
import ExcelIcon from "../../../assets/excel-icon.png";
import {CustomTick} from "../../../helpers/CustomTick";
import {formatNumber} from "../../../helpers/formatNumber";

const TopMoleculesChart = ({data}) => {
    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <h3 style={styles.title}>Top Molecules</h3>
                <button onClick={() => exportToExcelCharts(data)} style={{border: "none"}}>
                    <img src={ExcelIcon} alt="Excel Icon" style={styles.icon}/></button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{top: 10, right: 30, left: 30, bottom: 20}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="companyName"
                           interval={0}
                           tick={<CustomTick/>}
                    />
                    <YAxis tickFormatter={formatNumber}/>
                    <Tooltip formatter={(value, name) => [formatNumber(value), name]}/>
                    <Legend verticalAlign="top"/>

                    <Bar dataKey="totalValue" fill="#135d31" barSize={50}
                         radius={[10, 10, 0, 0]}/>
                </BarChart>

            </ResponsiveContainer>
        </div>
    );
};

const styles = {
    icon: {
        width: "25px",
        height: "25px",
        cursor: "pointer",
    },
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
    }
};

export default TopMoleculesChart;
