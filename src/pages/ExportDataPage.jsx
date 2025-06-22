import React, {useEffect, useState} from "react";
import Header from "./Dashboard/Header";
import {getTokenPayload} from "../auth/PrivateRoute";
import axios from "axios";
import Loader from "../components/Loader";
import ExcelIcon from "../assets/excel-icon.png";
import MultiSelect from "../components/filter/MultiSelect";
const columns = [
    {name: "Year", value: "year"},
    {name: "Market Type", value: "segment"},
    {name: "Trade Name", value: "tradeName"},
    {name: "Manufacturer", value: "manufacturingCompany"},
    {name: "License", value: "personWithTradingLicense"},
    {name: "Interested Stand", value: "personInterestedInRegistrationGeorgiaStand"},
    {name: "Interested Party", value: "interestedParty"},
    {name: "Rx/OTC", value: "rxOtc"},
    {name: "Mode", value: "modeOfRegistration"},
    {name: "SKU", value: "sku"},
    {name: "Dosage Form", value: "drugForm"},
    {name: "Dosage", value: "dosage"},
    {name: "Package Size", value: "packQuantity"},
    {name: "Molecule", value: "inn"},
    {name: "ATC Level 1", value: "atc1"},
    {name: "ATC Level 2", value: "atc2"},
    {name: "ATC Level 3", value: "atc3"},
    {name: "Price USD", value: "pricePerUnitUsd"},
    {name: "Price Lari", value: "pricePerUnitLari"},
    {name: "Period", value: "importDate"},
    {name: "Price Source", value: "priceSource"},
];

const columns2 = [
    {name: "Volume Units", value: "volumeInUnits"},
    {name: "Value GEL", value: "valueInGel"},
    {name: "Value USD", value: "valueInUsd"},
    {name: "Volume SU", value: "volumeInSU"},
];

const ExportDataPage = () => {
    const [allMarketTypes, setAllMarketTypes] = useState([]);
    const [allTradeNames, setAllTradeNames] = useState([]);
    const [allManufacturer, setAllManufacturer] = useState([]);
    const [allMolecules, setAllMolecules] = useState([]);
    const [allATC1, setAllATC1] = useState([]);
    const [allATC2, setAllATC2] = useState([]);
    const [allATC3, setAllATC3] = useState([]);
    const [allDosageForm, setAllDosageForm] = useState([]);
    const [allPackageSize, setAllPackageSize] = useState([]);
    const [allDosage, setAllDosage] = useState([]);

    const [marketType, setMarketType] = useState([]);
    const [tradeName, setTradeName] = useState([]);
    const [manufacturer, setManufacturer] = useState([]);
    const [molecule, setMolecule] = useState([]);
    const [atc1, setATC1] = useState([]);
    const [atc2, setATC2] = useState([]);
    const [atc3, setATC3] = useState([]);
    const [dosageForm, setDosageForm] = useState([]);
    const [packageSize, setPackageSize] = useState([]);
    const [dosage, setDosage] = useState([]);
    const payload = getTokenPayload();


    const fetchAll = async () => {
        setLoading(true);
        try {
            const [res1, res2, res3, res4, res5, res6, res7, res8, res9, res10] = await Promise.all([
                axios.get(`https://vigilant-youthfulness-production.up.railway.app/api/user-access/reference/segment?userId=${payload.id}`),
                axios.get(`https://vigilant-youthfulness-production.up.railway.app/api/user-access/reference/trade-name?userId=${payload.id}`),
                axios.get(`https://vigilant-youthfulness-production.up.railway.app/api/user-access/reference/manufacturing-company?userId=${payload.id}`),
                axios.get(`https://vigilant-youthfulness-production.up.railway.app/api/user-access/reference/inn?userId=${payload.id}`),
                axios.get(`https://vigilant-youthfulness-production.up.railway.app/api/user-access/reference/atc1?userId=${payload.id}`),
                axios.get(`https://vigilant-youthfulness-production.up.railway.app/api/user-access/reference/atc2?userId=${payload.id}`),
                axios.get(`https://vigilant-youthfulness-production.up.railway.app/api/user-access/reference/atc3?userId=${payload.id}`),
                axios.get(`https://vigilant-youthfulness-production.up.railway.app/api/user-access/reference/dosage?userId=${payload.id}`),
                axios.get(`https://vigilant-youthfulness-production.up.railway.app/api/user-access/reference/pack-quantities?userId=${payload.id}`),
                axios.get(`https://vigilant-youthfulness-production.up.railway.app/api/user-access/reference/drug-form?userId=${payload.id}`),
            ]);
            setAllMarketTypes(res1.data);
            setMarketType(res1.data.map(opt => opt.name))

            setAllTradeNames(res2.data); // сохраняем ответ
            setTradeName(res2.data.map(opt => opt.name))

            setAllManufacturer(res3.data); // сохраняем ответ
            setManufacturer(res3.data.map(opt => opt.name))

            setAllMolecules(res4.data); // сохраняем ответ
            setMolecule(res4.data.map(opt => opt.name))

            setAllATC1(res5.data); // сохраняем ответ
            setATC1(res5.data.map(opt => opt.name))

            setAllATC2(res6.data); // сохраняем ответ
            setATC2(res6.data.map(opt => opt.name))

            setAllATC3(res7.data); // сохраняем ответ
            setATC3(res7.data.map(opt => opt.name))

            setAllDosage(res8.data); // сохраняем ответ drug-form
            setDosage(res8.data.map(opt => opt.name))

            setAllPackageSize(res9.data); // сохраняем ответ drug-form
            setPackageSize(res9.data.map(opt => opt.name))

            setAllDosageForm(res10.data); // сохраняем ответ drug-form
            setDosageForm(res10.data.map(opt => opt.name))
        } catch (e) {
            console.error("Error fetching data", e);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAll()
    }, []);
    const [loading, setLoading] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState(["volumeInUnits"]);

    const toggleColumn = (col) => {
        setSelectedColumns((prev) =>
            prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
        );
    };
    const handleCheckboxToggle = (field) => {
        const triggerFields = ["segment", "tradeName","manufacturingCompany",
            "drugForm","dosage","packQuantity","inn","atc1", "atc2", "atc3"];
        if (!selectedColumns.includes(field) && triggerFields.includes(field)) {
            setCurrent(field);
            setShowModal(true);
        }
        toggleColumn(field);
    };
    const [selectedColumns2, setSelectedColumns2] = useState(["volumeInUnits"]);

    const handleCheckboxToggle2 = (value) => {
        toggleColumn(value);

        const isSelected = selectedColumns2.includes(value);

        if (isSelected) {
            if (selectedColumns2.length === 1) {
                // prevent unchecking the last selected option
                return;
            }
            setSelectedColumns2(selectedColumns2.filter((v) => v !== value));
        } else {
            setSelectedColumns2([...selectedColumns2, value]);
        }
    };
    const downloadExcel = async () => {
        setLoading(true)
        const body1 = {
            filter: {
                inn: molecule,
                segment: marketType,
                tradeName: tradeName,
                manufacturingCompany: manufacturer,
                drugForm: dosageForm,
                dosage: dosage,
                packQuantity: packageSize,
                atc1: atc1,
                atc2: atc2,
                atc3: atc3,
            }, columns: selectedColumns
        };
        try {
            const response = await axios.post(
                "https://vigilant-youthfulness-production.up.railway.app/api/drugs/export-custom",
                body1,
                {
                    responseType: 'blob'
                }
            );
            if (response) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'report.xlsx'); // имя файла
                document.body.appendChild(link);
                link.click();
                link.remove();
            }

        } catch (error) {
            console.error("POST error:", error);
        } finally {
            setLoading(false); // Скрыть loader
        }
    }

    const [showModal, setShowModal] = useState(false);
    const [current, setCurrent] = useState(null); // 'atc1', 'atc2', 'atc3'
    return (
        <div style={styles.container}>
            <Header userName={'asdf'}/>

            <div style={styles.section}>
                <h3 style={styles.title}>Available Columns</h3>
                <div style={styles.grid}>
                    {columns.map((col) => (
                        <div style={styles.selectMetric}>
                            <label key={col.value} style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={selectedColumns.includes(col.value)}
                                    onChange={() => handleCheckboxToggle(col.value)}
                                />
                                <span>{col.name}</span>
                            </label>
                        </div>
                    ))}

                </div>
            </div>

            <div style={styles.section}>
                <h3 style={styles.title}>Metrics Columns</h3>
                <div style={styles.grid}>
                    {columns2.map((col) => (
                        <div key={col.value} style={styles.selectMetric}>
                            <label style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={selectedColumns2.includes(col.value)}
                                    onChange={() => handleCheckboxToggle2(col.value)}
                                />
                                <span>{col.name}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div style={styles.footer}>
                <p style={{fontWeight: "bold", marginBottom: "10px"}}>
                    {selectedColumns.length} columns selected | Format: {selectedColumns2.join(", ")}
                </p>

                {loading ? <Loader/> :
                    <button onClick={() => downloadExcel()} style={{border: "none"}}>
                    <img src={ExcelIcon} alt="Excel Icon" style={styles.icon}/>
                    </button>
                }
            </div>
            {showModal && (
                <div style={modalBackdrop}>
                    <div style={modal}>
                        <h3 style={{marginBottom: 10}}>
                            {current === "atc1" && "ATC Level 1"}
                            {current === "atc2" && "ATC Level 2"}
                            {current === "atc3" && "ATC Level 3"}
                        </h3>
                        {current === "segment" && (
                            <MultiSelect
                                label="Market Type"
                                options={allMarketTypes}
                                selected={marketType}
                                onChange={setMarketType}
                            />
                        )}

                        {current === "tradeName" && (
                            <MultiSelect
                                label="Trade Name"
                                options={allTradeNames}
                                selected={tradeName}
                                onChange={setTradeName}
                            />
                        )}

                        {current === "manufacturingCompany" && (
                            <MultiSelect
                                label="Manufacturer"
                                options={allManufacturer}
                                selected={manufacturer}
                                onChange={setManufacturer}
                            />
                        )}

                        {current === "inn" && (
                            <MultiSelect
                                label="Molecule"
                                options={allMolecules}
                                selected={molecule}
                                onChange={setMolecule}
                            />
                        )}

                        {current === "atc1" && (
                            <MultiSelect
                                label="ATC Level 1"
                                options={allATC1}
                                selected={atc1}
                                onChange={setATC1}
                            />
                        )}

                        {current === "atc2" && (
                            <MultiSelect
                                label="ATC Level 2"
                                options={allATC2}
                                selected={atc2}
                                onChange={setATC2}
                            />
                        )}

                        {current === "atc3" && (
                            <MultiSelect
                                label="ATC Level 3"
                                options={allATC3}
                                selected={atc3}
                                onChange={setATC3}
                            />
                        )}

                        {current === "drugForm" && (
                            <MultiSelect
                                label="Dosage Form"
                                options={allDosageForm}
                                selected={dosageForm}
                                onChange={setDosageForm}
                            />
                        )}

                        {current === "packQuantity" && (
                            <MultiSelect
                                label="Package Size"
                                options={allPackageSize}
                                selected={packageSize}
                                onChange={setPackageSize}
                            />
                        )}

                        {current === "dosage" && (
                            <MultiSelect
                                label="Dosage"
                                options={allDosage}
                                selected={dosage}
                                onChange={setDosage}
                            />
                        )}

                        <button
                            onClick={() => {
                                setShowModal(false);
                                setCurrent(null);
                            }}
                            style={buttonStyle}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};
const modalBackdrop = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
};

const modal = {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "400px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)"
};

const buttonStyle = {
    marginTop: 20,
    padding: "8px 16px",
    border: "none",
    backgroundColor: "#135d31",
    color: "#fff",
    borderRadius: 6,
    cursor: "pointer"
};

const styles = {
    container: {
        fontFamily: "sans-serif",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
    },
    section: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        marginBottom: 30,
        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 12,
    },
    checkboxLabel: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 14,
        cursor: "pointer",

    },
    row: {
        display: "flex",
        gap: 20,
        marginBottom: 30,
    },
    half: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
    },
    radioGroup: {
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
    },
    radioBox: {
        padding: 10,
        borderRadius: 10,
        border: "1px solid #ccc",
        cursor: "pointer",
        backgroundColor: "#f1f1f1",
        minWidth: 120,
        textAlign: "center",
    },
    selectedBox: {
        border: "2px solid #135d31",
        backgroundColor: "#e0f2f1",
        fontWeight: "bold",
    },
    selectMetric: {
        padding: "8px 14px",
        border: "3px solid #fb6f5e",
        borderRadius: 8,
        fontWeight: "bold",
    },
    footer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "#135d31",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        fontWeight: "bold",
    },
    icon: {
        width: "25px",
        height: "25px",
        cursor: "pointer",

    },

};

export default ExportDataPage;
