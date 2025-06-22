import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
export const mockData  = [
    {
        "Period": "2024-Q1",
        "Trade Name": "Paracetamol",
        "Manufacturer": "Pfizer",
        "Molecule": "Acetaminophen",
        "ATC Level 1": "N",
        "ATC Level 2": "N02",
        "ATC Level 3": "N02B",
        "Dosage Form": "Tablet",
        "Package Size": "10",
        "Dosage": "500mg",
        "Market Type": "Retail",
        "Region": "Europe"
    },
    {
        "Period": "2024-Q1",
        "Trade Name": "Aspirin",
        "Manufacturer": "Bayer",
        "Molecule": "Acetylsalicylic Acid",
        "ATC Level 1": "B",
        "ATC Level 2": "B01",
        "ATC Level 3": "B01A",
        "Dosage Form": "Tablet",
        "Package Size": "20",
        "Dosage": "100mg",
        "Market Type": "Hospital",
        "Region": "Asia"
    },
    {
        "Period": "2024-Q2",
        "Trade Name": "Ibuprofen",
        "Manufacturer": "Sanofi",
        "Molecule": "Ibuprofen",
        "ATC Level 1": "M",
        "ATC Level 2": "M01",
        "ATC Level 3": "M01A",
        "Dosage Form": "Capsule",
        "Package Size": "15",
        "Dosage": "400mg",
        "Market Type": "Retail",
        "Region": "USA"
    },
    {
        "Period": "2024-Q2",
        "Trade Name": "Amoxicillin",
        "Manufacturer": "GSK",
        "Molecule": "Amoxicillin",
        "ATC Level 1": "J",
        "ATC Level 2": "J01",
        "ATC Level 3": "J01C",
        "Dosage Form": "Syrup",
        "Package Size": "100ml",
        "Dosage": "250mg/5ml",
        "Market Type": "Retail",
        "Region": "Europe"
    },
    {
        "Period": "2024-Q3",
        "Trade Name": "Metformin",
        "Manufacturer": "Novartis",
        "Molecule": "Metformin",
        "ATC Level 1": "A",
        "ATC Level 2": "A10",
        "ATC Level 3": "A10B",
        "Dosage Form": "Tablet",
        "Package Size": "30",
        "Dosage": "850mg",
        "Market Type": "Hospital",
        "Region": "Asia"
    },
    {
        "Period": "2024-Q3",
        "Trade Name": "Lisinopril",
        "Manufacturer": "Teva",
        "Molecule": "Lisinopril",
        "ATC Level 1": "C",
        "ATC Level 2": "C09",
        "ATC Level 3": "C09A",
        "Dosage Form": "Tablet",
        "Package Size": "28",
        "Dosage": "10mg",
        "Market Type": "Retail",
        "Region": "USA"
    },
    {
        "Period": "2024-Q4",
        "Trade Name": "Losartan",
        "Manufacturer": "Sandoz",
        "Molecule": "Losartan",
        "ATC Level 1": "C",
        "ATC Level 2": "C09",
        "ATC Level 3": "C09C",
        "Dosage Form": "Tablet",
        "Package Size": "30",
        "Dosage": "50mg",
        "Market Type": "Retail",
        "Region": "Europe"
    },
    {
        "Period": "2024-Q4",
        "Trade Name": "Omeprazole",
        "Manufacturer": "Dr. Reddy’s",
        "Molecule": "Omeprazole",
        "ATC Level 1": "A",
        "ATC Level 2": "A02",
        "ATC Level 3": "A02B",
        "Dosage Form": "Capsule",
        "Package Size": "14",
        "Dosage": "20mg",
        "Market Type": "Hospital",
        "Region": "Asia"
    },
    {
        "Period": "2025-Q1",
        "Trade Name": "Atorvastatin",
        "Manufacturer": "Pfizer",
        "Molecule": "Atorvastatin",
        "ATC Level 1": "C",
        "ATC Level 2": "C10",
        "ATC Level 3": "C10A",
        "Dosage Form": "Tablet",
        "Package Size": "30",
        "Dosage": "40mg",
        "Market Type": "Retail",
        "Region": "USA"
    },
    {
        "Period": "2025-Q1",
        "Trade Name": "Simvastatin",
        "Manufacturer": "Merck",
        "Molecule": "Simvastatin",
        "ATC Level 1": "C",
        "ATC Level 2": "C10",
        "ATC Level 3": "C10A",
        "Dosage Form": "Tablet",
        "Package Size": "30",
        "Dosage": "20mg",
        "Market Type": "Hospital",
        "Region": "Europe"
    },
    {
        "Period": "2025-Q2",
        "Trade Name": "Clopidogrel",
        "Manufacturer": "Sanofi",
        "Molecule": "Clopidogrel",
        "ATC Level 1": "B",
        "ATC Level 2": "B01",
        "ATC Level 3": "B01A",
        "Dosage Form": "Tablet",
        "Package Size": "28",
        "Dosage": "75mg",
        "Market Type": "Retail",
        "Region": "Asia"
    },
    {
        "Period": "2025-Q2",
        "Trade Name": "Levothyroxine",
        "Manufacturer": "Abbott",
        "Molecule": "Levothyroxine",
        "ATC Level 1": "H",
        "ATC Level 2": "H03",
        "ATC Level 3": "H03A",
        "Dosage Form": "Tablet",
        "Package Size": "50",
        "Dosage": "100mcg",
        "Market Type": "Hospital",
        "Region": "USA"
    },
    {
        "Period": "2025-Q3",
        "Trade Name": "Azithromycin",
        "Manufacturer": "Zydus",
        "Molecule": "Azithromycin",
        "ATC Level 1": "J",
        "ATC Level 2": "J01",
        "ATC Level 3": "J01F",
        "Dosage Form": "Tablet",
        "Package Size": "3",
        "Dosage": "500mg",
        "Market Type": "Retail",
        "Region": "Europe"
    },
    {
        "Period": "2025-Q3",
        "Trade Name": "Doxycycline",
        "Manufacturer": "Sun Pharma",
        "Molecule": "Doxycycline",
        "ATC Level 1": "J",
        "ATC Level 2": "J01",
        "ATC Level 3": "J01A",
        "Dosage Form": "Capsule",
        "Package Size": "10",
        "Dosage": "100mg",
        "Market Type": "Hospital",
        "Region": "Asia"
    },
    {
        "Period": "2025-Q4",
        "Trade Name": "Hydrochlorothiazide",
        "Manufacturer": "Teva",
        "Molecule": "Hydrochlorothiazide",
        "ATC Level 1": "C",
        "ATC Level 2": "C03",
        "ATC Level 3": "C03A",
        "Dosage Form": "Tablet",
        "Package Size": "30",
        "Dosage": "25mg",
        "Market Type": "Retail",
        "Region": "USA"
    }
];

export const exportToExcelCharts = (data, filename = "chart_data.xlsx") => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, filename);
};


export const exportToExcelFull = (data, filename = "chart_data.xlsx") => {
    try {
        const worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: false });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
            compression: true, // 💡 Включить сжатие
        });

        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(blob, filename);
    } catch (error) {
        console.error("Excel export error:", error);
    }
};


export const exportDataToExcel = (selectedColumns) => {
    if (!selectedColumns.length) {
        alert("Please select at least one column");
        return;
    }

    // Оставляем только выбранные поля
    const filteredData = mockData.map((row) => {
        const filteredRow = {};
        selectedColumns.forEach((col) => {
            filteredRow[col] = row[col];
        });
        return filteredRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Export");

    XLSX.writeFile(workbook, "exported_data.xlsx");
};