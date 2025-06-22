import React, {useEffect, useState} from "react";
import Header from "./Dashboard/Header"
import TopProductsChart from "./Dashboard/Charts/TopProducts";
import TopMoleculesChart from "./Dashboard/Charts/TopMolecules";
import TopCompaniesChart from "./Dashboard/Charts/TopCompanies";
import MarketShareChart from "./Dashboard/Charts/MarketShare";
import MarketTypeChart from "./Dashboard/Charts/MarketType";
import MultiSelect from "../components/filter/MultiSelect";
import '../App.css'
import QuarterRangePicker from "../components/filter/RangePickerC";
import dayjs from "dayjs";
import axios from "axios";
import {getTokenPayload} from "../auth/PrivateRoute";
import SectionLoader from "../components/SectionLoader";
import ExcelIcon from "../assets/excel-icon.png";
import {formatNumber} from "../helpers/formatNumber";


const DashboardPage = () => {

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


    const [selectedRange, setSelectedRange] = useState(null);
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
    const [filterLoader, setFilterLoader] = useState(false)
    const payload = getTokenPayload();


    const fetchAll = async () => {
        setFilterLoader(true);
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
            setFilterLoader(false);
        }
    };
    useEffect(() => {
        fetchAll()
    }, []);

    useEffect(() => {
        getTopCompanies();
        getTopProducts();
        getTopMolecules();
        getTopATC();
        getTopMarket()
        getValue()
    }, [filterLoader]);
    const [metricCompany, setMetricCompany] = useState('valueInUsd');
    const [metricProduct, setMetricProduct] = useState('valueInUsd');
    const [metricMolecule, setMetricMolecule] = useState('valueInUsd');
    const [metricATC, setMetricATC] = useState('valueInUsd');
    const [metricMarket, setMetricMarket] = useState('valueInUsd');
    const handleMetricCompanyChange = (e) => {
        setMetricCompany(e.target.value);
    };
    const handleMetricProductChange = (e) => {
        setMetricProduct(e.target.value);
    };
    const handleMetricMoleculeChange = (e) => {
        setMetricMolecule(e.target.value);
    };
    const handleMetricATC = (e) => {
        setMetricATC(e.target.value);
    };
    const handleMetricMarket = (e) => {
        setMetricMarket(e.target.value);
    };
    const [filteredAllData, setFilteredAllData] = useState([])
    const [loading, setLoading] = useState(false);
    const [topCompanies, setTopCompanies] = useState([])
    const [topProducts, setTopProducts] = useState([])
    const [topMolecules, setTopMolecules] = useState([])
    const [topATC, setTopATC] = useState([])
    const [topMarket, setTopMarket] = useState([])
    const postFilteredData = async () => {
        setLoading(true); // Показать loader
        const body = {
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
            dateFrom: selectedRange !== null ? selectedRange.dateFrom : dayjs().format("YYYY-MM-DD"),
            dateTo: selectedRange !== null ? selectedRange.dateTo : dayjs().format("YYYY-MM-DD")
        };
        try {
            const response = await axios.post(
                "https://vigilant-youthfulness-production.up.railway.app/api/drugs/filter",
                body
            );
            console.log("response", response)
            setFilteredAllData(response.data)
        } catch (error) {
            console.error("POST error:", error);
        } finally {
            setLoading(false); // Скрыть loader
        }
    };
    const body = {
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
        dateFrom: selectedRange !== null ? selectedRange.dateFrom : dayjs().subtract(1, 'year').format("YYYY-MM-DD"),
        dateTo: selectedRange !== null ? selectedRange.dateTo : dayjs().format("YYYY-MM-DD")
    };

    const [companyLoader, setCompanyLoader] = useState(false);
    const getTopCompanies = async () => {
        setCompanyLoader(true);
        try {
            const response = await axios.post(
                `https://vigilant-youthfulness-production.up.railway.app/api/drugs/top-companies?metric=${metricCompany}`,
                body
            );
            setTopCompanies(response.data)
        } catch (error) {
            console.error("POST error:", error);
        } finally {
            setCompanyLoader(false); // Скрыть loader
        }
    };
    useEffect(() => {
        getTopCompanies()
    }, [metricCompany]);

    const [productLoader, setProductLoader] = useState(false)
    const getTopProducts = async () => {
        setProductLoader(true)
        try {
            const response = await axios.post(
                `https://vigilant-youthfulness-production.up.railway.app/api/drugs/top-products?metric=${metricCompany}`,
                body
            );
            setTopProducts(response.data)
        } catch (error) {
            console.error("POST error:", error);
        } finally {
            setProductLoader(false); // Скрыть loader
        }
    };
    useEffect(() => {
        getTopProducts()
    }, [metricProduct]);

    const [moleculeLoader, setMoleculeLoader] = useState(false)
    const getTopMolecules = async () => {
        setMoleculeLoader(true)
        try {
            const response = await axios.post(
                `https://vigilant-youthfulness-production.up.railway.app/api/drugs/top-molecules?metric=${metricCompany}`,
                body
            );
            setTopMolecules(response.data)
        } catch (error) {
            console.error("POST error:", error);
        } finally {
            setMoleculeLoader(false); // Скрыть loader
        }
    };
    useEffect(() => {
        getTopMolecules()
    }, [metricMolecule]);

    const [atcLoader, setatcLoader] = useState(false)
    const getTopATC = async () => {
        setatcLoader(true)
        try {
            const response = await axios.post(
                `https://vigilant-youthfulness-production.up.railway.app/api/drugs/top-atc1?metric=${metricATC}`,
                body
            );
            setTopATC(response.data)
        } catch (error) {
            console.error("POST error:", error);
        } finally {
            setatcLoader(false); // Скрыть loader
        }
    };
    useEffect(() => {
        getTopATC()
    }, [metricATC]);


    const [marketLoader, setMarketLoader] = useState(false)
    const getTopMarket = async () => {
        setMarketLoader(true)
        try {
            const response = await axios.post(
                `https://vigilant-youthfulness-production.up.railway.app/api/drugs/top-segment?metric=${metricATC}`,
                body
            );
            setTopMarket(response.data)
        } catch (error) {
            console.error("POST error:", error);
        } finally {
            setMarketLoader(false); // Скрыть loader
        }
    };
    useEffect(() => {
        getTopMarket()
    }, [metricMarket]);


    const downloadExcel = async () => {
        setLoading(true)
        const body1 = {
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
            dateFrom: selectedRange !== null ? selectedRange.dateFrom : dayjs().format("YYYY-MM-DD"),
            dateTo: selectedRange !== null ? selectedRange.dateTo : dayjs().format("YYYY-MM-DD")
        };
        try {
            const response = await axios.post(
                "https://vigilant-youthfulness-production.up.railway.app/api/drugs/export",
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


    const [value, setValue] = useState(null)

    const [valueLoader, setValueLoader] = useState(false)
    const getValue = async () => {
        setValueLoader(true)
        try {
            const response = await axios.post(
                `https://vigilant-youthfulness-production.up.railway.app/api/drugs/total-values`,
                body
            );
            setValue(response.data)
        } catch (error) {
            console.error("POST error:", error);
        } finally {
            setValueLoader(false); // Скрыть loader
        }
    };
    useEffect(() => {
        getValue()
    }, []);


    return (
        <div style={styles.container}>
            {/* Header */}
            <Header userName="User"/>

            {/* Main content */}
            <div style={styles.content}>

                {
                    filterLoader ? <div style={styles.spinner}></div> :
                        <>
                            <aside style={styles.sidebar}>
                                <h3>Filters</h3>
                                <QuarterRangePicker onChange={setSelectedRange}/>
                                <MultiSelect
                                    label={"Market Type"}
                                    options={allMarketTypes}
                                    selected={marketType}
                                    onChange={setMarketType}
                                />
                                <MultiSelect
                                    label={"Trade Name"}
                                    options={allTradeNames}
                                    selected={tradeName}
                                    onChange={setTradeName}
                                    key={"trade_name"}
                                />
                                <MultiSelect
                                    label={"Manufacturer"}
                                    options={allManufacturer}
                                    selected={manufacturer}
                                    onChange={setManufacturer}
                                />
                                <MultiSelect
                                    label={"Molecule"}
                                    options={allMolecules}
                                    selected={molecule}
                                    onChange={setMolecule}
                                />
                                <MultiSelect
                                    label={"ATC Level 1"}
                                    options={allATC1}
                                    selected={atc1}
                                    onChange={setATC1}
                                />
                                <MultiSelect
                                    label={"ATC Level 2"}
                                    options={allATC2}
                                    selected={atc2}
                                    onChange={setATC2}
                                />
                                <MultiSelect
                                    label={"ATC Level 3"}
                                    options={allATC3}
                                    selected={atc3}
                                    onChange={setATC3}
                                />
                                <MultiSelect
                                    label={"Dosage Form"}
                                    options={allDosageForm}
                                    selected={dosageForm}
                                    onChange={setDosageForm}
                                />
                                <MultiSelect
                                    label={"Package Size"}
                                    options={allPackageSize}
                                    selected={packageSize}
                                    onChange={setPackageSize}
                                />
                                <MultiSelect
                                    label={"Dosage"}
                                    options={allDosage}
                                    selected={dosage}
                                    onChange={setDosage}
                                />
                                <button style={styles.headerButton} onClick={() => {
                                    // postFilteredData();
                                    getTopCompanies();
                                    getTopProducts();
                                    getTopMolecules();
                                    getTopATC();
                                    getTopMarket()
                                    getValue()
                                }}>
                                    Search
                                </button>

                            </aside>

                            <main style={styles.charts}>

                                <>
                                    <div style={styles.row}>
                                        <div style={styles.half}>
                                            {valueLoader ? (
                                                <SectionLoader/>
                                            ) : (
                                                <div style={styles.valueBox}>
                                                    <strong
                                                        style={{...styles.bigValue, color: 'black'}}>Total Market Value in Dollars:</strong>
                                                    <strong
                                                        style={styles.bigValue}> ${value && formatNumber(value[0].totalValue)}</strong>
                                                </div>
                                            )}
                                        </div>
                                        <div style={styles.half}>
                                            {valueLoader ? (
                                                <SectionLoader/>
                                            ) : (
                                                <div style={styles.valueBox}>
                                                    <strong
                                                        style={{...styles.bigValue, color: 'black'}}> Total Market Volume in SU:</strong>
                                                        <strong
                                                            style={styles.bigValue}> {value && value.length > 0 && formatNumber(value[1].totalValue)}</strong>
                                                </div>
                                                )}
                                        </div>
                                    </div>

                                    <div style={styles.row}>
                                        <div style={styles.half}>
                                            <select value={metricATC} onChange={handleMetricATC} style={styles.selectMetric}>
                                                <option value="valueInUsd">USD</option>
                                                <option value="valueInGel">Lari</option>
                                                <option value="volumeInSU">SU</option>
                                            </select>
                                            {
                                                atcLoader ? <SectionLoader/> :
                                                    <MarketShareChart data={topATC}/>
                                            }

                                        </div>
                                        <div style={styles.half}>
                                            <select value={metricMarket} onChange={handleMetricMarket} style={styles.selectMetric}>
                                                <option value="valueInUsd">USD</option>
                                                <option value="valueInGel">Lari</option>
                                                <option value="volumeInSU">SU</option>
                                            </select>
                                            {
                                                marketLoader ? <SectionLoader/> :
                                                    <MarketTypeChart data={topMarket}/>
                                            }

                                        </div>
                                    </div>
                                    {/* Row 1: Companies & Products */}
                                    <div style={styles.row}>
                                        <div style={styles.half}>
                                            <select value={metricCompany} onChange={handleMetricCompanyChange} style={styles.selectMetric}>
                                                <option value="valueInUsd">USD</option>
                                                <option value="valueInGel">Lari</option>
                                                <option value="volumeInSU">SU</option>
                                            </select>
                                            {
                                                companyLoader ? <SectionLoader/> :
                                                    <TopCompaniesChart data={topCompanies}/>
                                            }
                                        </div>
                                        <div style={styles.half}>
                                            <select value={metricProduct} onChange={handleMetricProductChange}
                                                    style={styles.selectMetric}>
                                                <option  value="valueInUsd">USD</option>
                                                <option value="valueInGel">Lari</option>
                                                <option value="volumeInSU">SU</option>
                                            </select>
                                            {
                                                productLoader ? <SectionLoader/> :
                                                    <TopProductsChart data={topProducts}/>
                                            }
                                        </div>
                                    </div>

                                    {/* Row 2: Molecules Centered */}
                                    <div style={styles.centeredRow}>
                                        <div style={styles.centeredChart}>
                                            <select value={metricMolecule} onChange={handleMetricMoleculeChange}
                                                    style={styles.selectMetric}>
                                                <option value="valueInUsd">USD</option>
                                                <option value="valueInGel">Lari</option>
                                                <option value="volumeInSU">SU</option>
                                            </select>
                                            {
                                                moleculeLoader ? <SectionLoader/> :
                                                    <TopMoleculesChart data={topMolecules}/>
                                            }

                                        </div>
                                    </div>
                                    <button onClick={() => downloadExcel()} style={{border: "none"}}>
                                        <img src={ExcelIcon} alt="Excel Icon" style={styles.icon}/></button>
                                </>
                            </main>
                        </>
                }

            </div>
        </div>
    )
        ;
};

const styles = {
    headerButton: {
        padding: "8px 14px",
        backgroundColor: "#fb6f5e",
        border: "none",
        borderRadius: 6,
        fontSize:"16px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
    },
    selectMetric: {
        padding: "8px 14px",
        border: "3px solid #fb6f5e",
        borderRadius: 8,
        fontWeight: "bold",
        cursor: "pointer",
    },
    icon: {
        width: "25px",
        height: "25px",
        cursor: "pointer",
    },
    spinner: {
        border: "4px solid #ccc",
        borderTop: "4px solid #135d31",
        borderRadius: "50%",
        width: 55,
        height: 55,
        animation: "spin 0.8s linear infinite",
        margin: "auto",
    },
    container: {
        height: "100vh",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
    },
    header: {
        backgroundColor: "#135d31",
        color: "white",
        padding: "20px 30px",
        fontSize: 24,
        fontWeight: "bold",
    },
    content: {
        flex: 1,
        display: "flex",
    },
    sidebar: {
        width: "25%",
        backgroundColor: "#e0f2f1",
        padding: 20,
        flex: "row",
        gap: "5px",
        boxSizing: "border-box",
    },
    select: {
        display: "block",
        marginTop: 8,
        padding: 6,
        width: "100%",
    },
    charts: {
        width: "75%",
        padding: 20,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        backgroundColor: "#f9f9f9",
    },
    row: {
        display: "flex",
        gap: 20,
        marginBottom: 40,
    },
    half: {
        flex: 1,
    },
    centeredRow: {
        display: "flex",
        justifyContent: "center",
    },
    centeredChart: {
        width: "50%", // можно поменять на 50% или 70%
        minWidth: 400,
    },
    chartBox: {
        height: 200,
        backgroundColor: "#fb6f5e22",
        border: "1px solid #fb6f5e55",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 18,
        color: "#fb6f5e",
    },
    marketHeader: {
        backgroundColor: "#fff",
        padding: "16px 20px",
        borderRadius: 12,
        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
        marginBottom: 20,
    },
    title: {
        marginBottom: 8,
        color: "#333",
        fontSize: 16,
    },
    metrics: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
        fontSize: 14,
        color: "#444",
    },
    metricBox: {
        display: "flex",
        alignItems: "center",
        gap: 6,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "#135d31",
    },
    valueBox: {
        fontSize: 18,
        color: "#111",
        marginBottom: 10,
    },

    bigValue: {
        fontSize: 24,
        color: "#135d31",
        marginLeft: 8,
        fontWeight: 700,
    },

};

export default DashboardPage;
