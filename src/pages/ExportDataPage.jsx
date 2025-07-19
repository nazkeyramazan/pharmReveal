import React, {useEffect, useState} from "react";
import Header from "./Dashboard/Header";
import {getTokenPayload} from "../auth/PrivateRoute";
import axios from "../auth/axios";
import Loader from "../components/Loader";
import ExcelIcon from "../assets/excel-icon.png";
import MultiSelect from "../components/filter/MultiSelect";
import QuarterRangePicker from "../components/filter/RangePickerC";
import dayjs from "dayjs";

const columns = [
    {name: "Year", value: "year"},
    {name: "Segment", value: "segment"},
    {name: "Trade Name", value: "tradeName"},
    {name: "Manufacturing company", value: "manufacturingCompany"},
    {name: "Person with trading license", value: "personWithTradingLicense"},
    {name: "Person interested in registration in Georgia", value: "personInterestedInRegistrationGeorgiaStand"},
    {name: "Interested party (entity seeking registration in Georgia)", value: "interestedParty"},
    {name: "Rx/OTC", value: "rxOtc"},
    {name: "Mode of registration", value: "modeOfRegistration"},
    {name: "SKU", value: "sku"},
    {name: "Drug Form", value: "drugForm"},
    {name: "Dosage", value: "dosage"},
    {name: "Pack quantity", value: "packQuantity"},
    {name: "INN", value: "inn"},
    {name: "ATC1 WHO", value: "atc1"},
    {name: "ATC2 WHO", value: "atc2"},
    {name: "ATC3 WHO", value: "atc3"},
    {name: "Price per Unit, in Lari", value: "pricePerUnitLari"},
    {name: "Price per unit, in USD", value: "pricePerUnitUsd"},
    {name: "Import date", value: "importDate"},
    {name: "Price Source", value: "priceSource"},
];

const columns2 = [
    {name: "Volume Units", value: "volumeInUnits"},
    {name: "Volume SU", value: "volumeInSU"},
    {name: "Value GEL", value: "valueInGel"},
    {name: "Value USD", value: "valueInUsd"},
];

const ExportDataPage = () => {
    /*опции доступные юзеру*/
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
    const [allPersonWithTradingLicense, setAllPersonWithTradingLicense] = useState([]);
    const [allPersonInterestedInRegistrationGeorgiaStand, setAllPersonInterestedInRegistrationGeorgiaStand] = useState([]);
    const [allInterestedParty, setAllInterestedParty] = useState([]);
    const [allRxOtc, setAllRxOtc] = useState([]);
    const [allModeOfRegistration, setAllModeOfRegistration] = useState([]);
    const [allSku, setAllSku] = useState([]);
    const [allPriceSource, setAllPriceSource] = useState([]);

    /*опции выбранные из доступных юзером по дефолту выбраны все достуные*/
    const [marketType, setMarketType] = useState([]); //
    const [tradeName, setTradeName] = useState([]);
    const [manufacturer, setManufacturer] = useState([]);
    const [personWithTradingLicense, setPersonWithTradingLicense] = useState([]);
    const [personInterestedInRegistrationGeorgiaStand, setPersonInterestedInRegistrationGeorgiaStand] = useState([]);
    const [interestedParty, setInterestedParty] = useState([]);
    const [rxOtc, setRxOtc] = useState([]);
    const [modeOfRegistration, setModeOfRegistration] = useState([]);
    const [sku, setSku] = useState([]);
    const [priceSource, setPriceSource] = useState([]);
    const [molecule, setMolecule] = useState([]);
    const [atc1, setATC1] = useState([]);
    const [atc2, setATC2] = useState([]);
    const [atc3, setATC3] = useState([]);
    const [dosageForm, setDosageForm] = useState([]);
    const [packageSize, setPackageSize] = useState([]);
    const [dosage, setDosage] = useState([]);
    const payload = getTokenPayload();
    const [selectedRange, setSelectedRange] = useState(null);
    const valueLengths = {
        //year: marketType?.length || 0,
        segment: marketType?.length || 0,
        tradeName: tradeName?.length || 0,
        manufacturingCompany: manufacturer?.length || 0,
        personWithTradingLicense: personWithTradingLicense?.length || 0,
        personInterestedInRegistrationGeorgiaStand: personInterestedInRegistrationGeorgiaStand?.length || 0,
        interestedParty: interestedParty?.length || 0,
        rxOtc: rxOtc?.length || 0,
        modeOfRegistration: modeOfRegistration?.length || 0,
        sku: sku?.length || 0,
        drugForm: dosageForm?.length || 0,
        dosage: dosage?.length || 0,
        packQuantity: packageSize?.length || 0,
        inn: molecule?.length || 0,
        atc1: atc1?.length || 0,
        atc2: atc2?.length || 0,
        atc3: atc3?.length || 0,
        // pricePerUnitLari: atc3?.length || 0,
        // pricePerUnitUsd: atc3?.length || 0,
        importDate: selectedRange !== null ? "Date From: " + selectedRange?.dateFrom + " Date To: " + selectedRange?.dateFrom : "Date From: " + dayjs().subtract(1, 'year').format("YYYY-MM-DD") + "Date To: " + dayjs().format("YYYY-MM-DD"),
        priceSource: priceSource?.length || 0,
    }
    const fetchAll = async () => {
        setLoading(true);
        try {
            const [res1, res2, res3, res4, res5, res6, res7, res8, res9, res10, res11, res12, res13, res14, res15, res16, res17
            ] = await Promise.all([
                axios.get(`/api/user-access/reference/segment?userId=${payload.id}`),
                axios.get(`/api/user-access/reference/trade-name?userId=${payload.id}`),
                axios.get(`/api/user-access/reference/manufacturing-company?userId=${payload.id}`),
                axios.get(`/api/user-access/reference/inn?userId=${payload.id}`),
                axios.get(`/api/user-access/reference/atc1?userId=${payload.id}`),
                axios.get(`/api/user-access/reference/atc2?userId=${payload.id}`),
                axios.get(`/api/user-access/reference/atc3?userId=${payload.id}`),
                axios.get(`/api/user-access/reference/dosage?userId=${payload.id}`),
                axios.get(`/api/user-access/reference/pack-quantities?userId=${payload.id}`),
                axios.get(`/api/user-access/reference/drug-form?userId=${payload.id}`),

                axios.get(`/api/user-access/reference/sku?userId=${payload.id}`),
                axios.get(`/api/user-access/reference/rx-otc?userId=${payload.id}`),
                axios.get(`/api/user-access/reference/price-source?userId=${payload.id}`),
                axios.get(`/api/user-access/reference/person-with-trading-license?userId=${payload.id}`),
                axios.get(`/api/user-access/reference/person-interested-in-registration-georgia-stand?userId=${payload.id}`),
                axios.get(`/api/user-access/reference/mode-of-registration?userId=${payload.id}`),
                axios.get(`/api/user-access/reference/interested-party?userId=${payload.id}`),

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

            setAllSku(res11.data);
            setSku(res11.data.map(opt => opt.name))

            setAllRxOtc(res12.data); // сохраняем ответ drug-form
            setRxOtc(res12.data.map(opt => opt.name))

            setAllPriceSource(res13.data); // сохраняем ответ drug-form
            setPriceSource(res13.data.map(opt => opt.name))

            setAllPersonWithTradingLicense(res14.data); // сохраняем ответ drug-form
            setPersonWithTradingLicense(res14.data.map(opt => opt.name))

            setAllPersonInterestedInRegistrationGeorgiaStand(res15.data); // сохраняем ответ drug-form
            setPersonInterestedInRegistrationGeorgiaStand(res15.data.map(opt => opt.name))

            setAllModeOfRegistration(res16.data); // сохраняем ответ drug-form
            setModeOfRegistration(res16.data.map(opt => opt.name))

            setAllInterestedParty(res17.data); // сохраняем ответ drug-form
            setInterestedParty(res17.data.map(opt => opt.name))
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
    const [selected, setSelected] = useState([{name: "Volume Units", value: "volumeInUnits"}]);
    const toggleColumn = (col) => {
        setSelected(prev => {
            const exists = prev.some(item => item.value === col.value);
            if (exists) {
                return prev.filter(item => item.value !== col.value); // убрать
            } else {
                return [...prev, col]; // добавить
            }
        });

        setSelectedColumns((prev) =>
            prev.includes(col.value) ? prev.filter((c) => c !== col.value) : [...prev, col.value]
        );
    };
    const handleCheckboxToggle = (field) => {
        const triggerFields = ["segment", "tradeName", "manufacturingCompany",
            "drugForm", "dosage", "packQuantity", "inn", "atc1", "atc2", "atc3", "importDate"
            ,"sku","rxOtc","priceSource","personWithTradingLicense","personInterestedInRegistrationGeorgiaStand",
            "modeOfRegistration","interestedParty"];
        if (!selectedColumns.includes(field.value) && triggerFields.includes(field.value)) {
            setCurrent(field.value);
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

                sku: sku,
                rxOtc: rxOtc,
                priceSource: priceSource,
                personWithTradingLicense: personWithTradingLicense,
                personInterestedInRegistrationGeorgiaStand: personInterestedInRegistrationGeorgiaStand,
                modeOfRegistration: modeOfRegistration,
                interestedParty: interestedParty,

                dateFrom: selectedRange !== null ? selectedRange.dateFrom : dayjs().subtract(1, 'year').format("YYYY-MM-DD"),
                dateTo: selectedRange !== null ? selectedRange.dateTo : dayjs().format("YYYY-MM-DD")
            }, columns: selectedColumns
        };
        try {
            const response = await axios.post(
                "/api/drugs/export-custom",
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
                                    onChange={() => handleCheckboxToggle(col)}
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
                    {selectedColumns.length - selectedColumns2.length} columns selected | Format: {selectedColumns2.join(", ")}
                </p>

                {loading ? <Loader/> :
                    <button onClick={() => downloadExcel()} style={{border: "none"}}>
                        <img src={ExcelIcon} alt="Excel Icon" style={styles.icon}/>
                    </button>
                }
            </div>
            <div style={styles.selectedContainer}>
                {selected.map(item => {
                    if (valueLengths[item.value] !== undefined) {
                        return <p key={item.value}>{item.name} - {valueLengths[item.value]} items selected</p>;
                    }
                    return null;
                })}


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

                        {current === "sku" && (
                            <MultiSelect
                                label="Sku"
                                options={allSku}
                                selected={sku}
                                onChange={setSku}
                            />
                        )}
                        {current === "priceSource" && (
                            <MultiSelect
                                label="Price Source"
                                options={allPriceSource}
                                selected={priceSource}
                                onChange={setPriceSource}
                            />
                        )}
                        {current === "rxOtc" && (
                            <MultiSelect
                                label="rxOtc"
                                options={allRxOtc}
                                selected={rxOtc}
                                onChange={setRxOtc}
                            />
                        )}
                        {current === "personWithTradingLicense" && (
                            <MultiSelect
                                label="Person With Trading License"
                                options={allPersonWithTradingLicense}
                                selected={personWithTradingLicense}
                                onChange={setPersonWithTradingLicense}
                            />
                        )}
                        {current === "personInterestedInRegistrationGeorgiaStand" && (
                            <MultiSelect
                                label="Person Interested In Registration Georgia Stand"
                                options={allPersonInterestedInRegistrationGeorgiaStand}
                                selected={personInterestedInRegistrationGeorgiaStand}
                                onChange={setPersonInterestedInRegistrationGeorgiaStand}
                            />
                        )}
                        {current === "modeOfRegistration" && (
                            <MultiSelect
                                label="Mode Of Registration"
                                options={allModeOfRegistration}
                                selected={modeOfRegistration}
                                onChange={setModeOfRegistration}
                            />
                        )}
                        {current === "interestedParty" && (
                            <MultiSelect
                                label="Interested Party"
                                options={allInterestedParty}
                                selected={interestedParty}
                                onChange={setInterestedParty}
                            />
                        )}
                        {
                            current === "importDate" && (
                                <QuarterRangePicker onChange={setSelectedRange}/>
                            )
                        }

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
    },
    section: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 14,
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
        fontSize: 12,
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
    selectedContainer: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
        gap: 2
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
