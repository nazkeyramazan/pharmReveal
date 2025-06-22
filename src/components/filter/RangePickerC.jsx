import React from "react";
import { DatePicker } from "antd";
import "dayjs/locale/en"; // или "ru"
import locale from "antd/es/date-picker/locale/en_US";
import dayjs from "dayjs"; // для англ интерфейса

const { RangePicker } = DatePicker;

const QuarterRangePicker = ({onChange}) => {
    const handleChange = (dates) => {
        if (dates && dates.length === 2) {
            const [start, end] = dates;
            onChange({
                dateFrom: start.format("YYYY-MM-DD"),
                dateTo: end.format("YYYY-MM-DD")
            });
        } else {
            onChange(null);
        }
    };

    return (
        <div>
            <label style={{
                display: 'block',
                marginBottom: 4,
                fontSize: 16,
                fontWeight: 'bold',
                color: '#111'
            }}>
                Time period
            </label>
            <RangePicker
                onChange={handleChange}
                defaultValue={[dayjs().subtract(1, 'year'), dayjs()]}
                locale={locale}
                style={{width: "100%"}}
            />
        </div>

    );
};

export default QuarterRangePicker;
