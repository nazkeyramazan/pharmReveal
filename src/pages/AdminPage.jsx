import React, {useEffect, useState} from "react";
import axios from "../auth/axios";
import {useNavigate} from "react-router-dom";
import MultiSelect from "../components/filter/MultiSelect";
import Loader from "../components/Loader";
import ExcelUpload from "./ExportExcel";

const AdminPage = () => {

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
    const [personWithTradingLicense, setPersonWithTradingLicense] = useState([]);
    const [personInterestedInRegistrationGeorgiaStand, setPersonInterestedInRegistrationGeorgiaStand] = useState([]);
    const [interestedParty, setInterestedParty] = useState([]);
    const [rxOtc, setRxOtc] = useState([]);
    const [modeOfRegistration, setModeOfRegistration] = useState([]);
    const [sku, setSku] = useState([]);
    const [priceSource, setPriceSource] = useState([]);

    const [filterLoader, setFilterLoader] = useState(false)

    const fetchUserAccess = async (id) => {
        setFilterLoader(true);
        try {
            const [res1, res2, res3, res4, res5, res6, res7, res8, res9, res10,res11,res12,res13,res14,res15,res16,res17] = await Promise.all([
                axios.get(`/api/user-access/reference/segment?userId=${id}`),
                axios.get(`/api/user-access/reference/trade-name?userId=${id}`),
                axios.get(`/api/user-access/reference/manufacturing-company?userId=${id}`),
                axios.get(`/api/user-access/reference/inn?userId=${id}`),
                axios.get(`/api/user-access/reference/atc1?userId=${id}`),
                axios.get(`/api/user-access/reference/atc2?userId=${id}`),
                axios.get(`/api/user-access/reference/atc3?userId=${id}`),
                axios.get(`/api/user-access/reference/dosage?userId=${id}`),
                axios.get(`/api/user-access/reference/pack-quantities?userId=${id}`),
                axios.get(`/api/user-access/reference/drug-form?userId=${id}`),

                axios.get(`/api/user-access/reference/sku?userId=${id}`),
                axios.get(`/api/user-access/reference/rx-otc?userId=${id}`),
                axios.get(`/api/user-access/reference/price-source?userId=${id}`),
                axios.get(`/api/user-access/reference/person-with-trading-license?userId=${id}`),
                axios.get(`/api/user-access/reference/person-interested-in-registration-georgia-stand?userId=${id}`),
                axios.get(`/api/user-access/reference/mode-of-registration?userId=${id}`),
                axios.get(`/api/user-access/reference/interested-party?userId=${id}`),
            ]);
            setMarketType(res1.data.map(opt => opt.id))

            setTradeName(res2.data.map(opt => opt.id))

            setManufacturer(res3.data.map(opt => opt.id))

            setMolecule(res4.data.map(opt => opt.id))

            setATC1(res5.data.map(opt => opt.id))

            setATC2(res6.data.map(opt => opt.id))

            setATC3(res7.data.map(opt => opt.id))

            setDosage(res8.data.map(opt => opt.id))

            setPackageSize(res9.data.map(opt => opt.id))

            setDosageForm(res10.data.map(opt => opt.id))

            setSku(res11.data.map(opt => opt.id))

            setRxOtc(res12.data.map(opt => opt.id))

            setPriceSource(res13.data.map(opt => opt.id))

            setPersonWithTradingLicense(res14.data.map(opt => opt.id))

            setPersonInterestedInRegistrationGeorgiaStand(res15.data.map(opt => opt.id))

            setModeOfRegistration(res16.data.map(opt => opt.id))

            setInterestedParty(res17.data.map(opt => opt.id))
        } catch (e) {
            console.error("Error fetching data", e);
        } finally {
            setFilterLoader(false);
        }
    };
    const fetchAll = async () => {
        setFilterLoader(true);
        try {
            const [res1, res2, res3, res4, res5, res6, res7, res8, res9, res10,res11,res12,res13,res14,res15,res16,res17] = await Promise.all([
                axios.get("/api/reference/segment"),
                axios.get("/api/reference/trade-name"),
                axios.get("/api/reference/manufacturing-company"),
                axios.get("/api/reference/inn"),
                axios.get("/api/reference/atc1"),
                axios.get("/api/reference/atc2"),
                axios.get("/api/reference/atc3"),
                axios.get("/api/reference/dosage"),
                axios.get("/api/reference/pack-quantities"),
                axios.get("/api/reference/drug-form"),

                axios.get("/api/reference/sku"),
                axios.get("/api/reference/rx-otc"),
                axios.get("/api/reference/price-source"),
                axios.get("/api/reference/person-with-trading-license"),
                axios.get("/api/reference/person-interested-in-registration-georgia-stand"),
                axios.get("/api/reference/mode-of-registration"),
                axios.get("/api/reference/interested-party"),

            ]);
            setAllMarketTypes(res1.data);
            setAllTradeNames(res2.data); // сохраняем ответ
            setAllManufacturer(res3.data); // сохраняем ответ
            setAllMolecules(res4.data); // сохраняем ответ
            setAllATC1(res5.data); // сохраняем ответ
            setAllATC2(res6.data); // сохраняем ответ
            setAllATC3(res7.data); // сохраняем ответ
            setAllDosage(res8.data); // сохраняем ответ drug-form
            setAllPackageSize(res9.data); // сохраняем ответ drug-form
            setAllDosageForm(res10.data); // сохраняем ответ drug-form

            setAllSku(res11.data)
            setAllRxOtc(res12.data)
            setAllPriceSource(res13.data)
            setAllPersonWithTradingLicense(res14.data)
            setAllPersonInterestedInRegistrationGeorgiaStand(res15.data);
            setAllModeOfRegistration(res16.data)
            setAllInterestedParty(res17.data)
        } catch (e) {
            console.error("Error fetching data", e);
        } finally {
            setFilterLoader(false);
        }
    };
    useEffect(() => {
        fetchAll()
    }, []);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()
    const [editingUser, setEditingUser] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [newUser, setNewUser] = useState({firstname: "", lastname: "", login: "", password: "", role: "USER"});
    const getUsersList = async () => {
        setFilterLoader(true)
        try {
            const response = await axios.get('/api/v1/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        } finally {
            setFilterLoader(false)
        }
    };
    useEffect(() => {
        getUsersList()
    }, []);
    const handleCreateUser = async () => {
        setFilterLoader(true)
        try {
            const response = await axios.post(
                "/api/v1/auth/register", // замените на ваш реальный URL
                {
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    email: newUser.login,
                    password: newUser.password,
                    role: newUser.role || "USER", // по умолчанию USER
                }
            );
            setIsCreating(false);
            getUsersList()
            setIsCreating(false)
            setNewUser({firstname: "", lastname: "", login: "", password: "", role: "user"});
            return response.data;

        } catch (error) {
            throw error;
        } finally {
            setFilterLoader(false)
        }
    };
    const onLogout = () => {
        navigate('/login');
        localStorage.removeItem("token");
    }
    const filterPermissions = async () => {
        setFilterLoader(true)
        try {
            await axios.post("/api/access/assign", {
                userId: editingUser.id,
                accesses: [
                    {refType: "SEGMENT", refIds: marketType},
                    {refType: "TRADE_NAME", refIds: tradeName},
                    {refType: "MANUFACTURING_COMPANY", refIds: manufacturer},
                    {refType: "INN", refIds: molecule},
                    {refType: "ATC1", refIds: atc1},
                    {refType: "ATC2", refIds: atc2},
                    {refType: "ATC3", refIds: atc3},
                    {refType: "DRUG_FORM", refIds: dosageForm},
                    {refType: "PACK_QUANTITY", refIds: packageSize},
                    {refType: "DOSAGE", refIds: dosage},
                    {refType: "PERSON_WITH_TRADING_LICENSE", refIds: personWithTradingLicense},
                    {refType: "PERSON_INTERESTED_IN_REGISTRATION_GEORGIA_STAND", refIds: personInterestedInRegistrationGeorgiaStand},
                    {refType: "INTERESTED_PARTY", refIds: interestedParty},
                    {refType: "RX_OTC", refIds: rxOtc},
                    {refType: "MODE_OF_REGISTRATION", refIds: modeOfRegistration},
                    {refType: "SKU", refIds: sku},
                    {refType: "PRICE_SOURCE", refIds: priceSource},
                ]
            });
        } catch (error) {
            console.error("Error posting access:", error);
        } finally {
            setFilterLoader(false)
        }

    }
    const deleteUser = async (id) => {
        try {
            setFilterLoader(true)
            await axios.delete(`/api/v1/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(()=>{
                    getUsersList()
                });

        } catch (error) {
            setFilterLoader(false)
            console.error('Delete failed:', error);
        }
    };
    return (
        <div style={{padding: 20, fontFamily: "sans-serif"}}>
            <h2>Admin Panel – Users</h2>
            <div style={{display: "flex", alignItems: "center", marginBottom: 10}}>
                <button onClick={() => navigate("/logs")} style={{...button,marginRight: 20}}>
                    Logs
                </button>
                <button onClick={() => setIsCreating(true)} style={{...button,marginRight: 20}}>
                    + Create User
                </button>
                <ExcelUpload/>
                <button onClick={onLogout}  style={{...button,marginLeft: "auto"}}>
                    Logout
                </button>
            </div>
            {
                filterLoader ? <Loader/> :
                    <table style={{width: "100%", borderCollapse: "collapse"}}>
                        <thead>
                        <tr style={{background: "#f0f0f0"}}>
                            <th style={cell}>FirstName</th>
                            <th style={cell}>LastName</th>
                            <th style={cell}>Login</th>
                            <th style={cell}>Role</th>
                            <th style={cell}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td style={cell}>{user.firstname}</td>
                                <td style={cell}>{user.lastname}</td>
                                <td style={cell}>{user.email}</td>
                                <td style={cell}>{user.role}</td>
                                <td style={cell}>
                                    {
                                        user.role === "USER" &&
                                        <button onClick={() => {
                                            setEditingUser(user)
                                            fetchUserAccess(user.id)

                                        }}
                                        style={button}
                                        >Edit Permissions</button>
                                    }

                                    {" "}
                                    <button
                                        onClick={() => {
                                            const confirmDelete = window.confirm(`Are you sure you want to delete "${user.email}"?`);
                                            if (confirmDelete) {
                                                deleteUser(user.id)
                                            }
                                        }}
                                        style={button}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            }

            {/* Modal Edit */}
            {editingUser && (
                <div style={modalBackdrop}>
                    <div style={modal}>
                        <h3>Edit User {editingUser.email}</h3>
                        {
                            filterLoader ? <Loader/> : null
                        }


                        <MultiSelect
                            label={"Market Type"}
                            options={allMarketTypes}
                            selected={marketType}
                            onChange={setMarketType}
                            valueField={'id'}
                        />
                        <MultiSelect
                            label={"Trade Name"}
                            options={allTradeNames}
                            selected={tradeName}
                            onChange={setTradeName}
                            valueField={'id'}
                        />
                        <MultiSelect
                            label={"Trading License"}
                            options={allManufacturer}
                            selected={manufacturer}
                            valueField={'id'}
                            onChange={setManufacturer}
                        />
                        <MultiSelect
                            label={"Molecule"}
                            options={allMolecules}
                            selected={molecule}
                            valueField={'id'}
                            onChange={setMolecule}
                        />
                        <MultiSelect
                            label={"ATC Level 1"}
                            options={allATC1}
                            selected={atc1}
                            valueField={'id'}
                            onChange={setATC1}
                        />
                        <MultiSelect
                            label={"ATC Level 2"}
                            options={allATC2}
                            selected={atc2}
                            valueField={'id'}
                            onChange={setATC2}
                        />
                        <MultiSelect
                            label={"ATC Level 3"}
                            options={allATC3}
                            selected={atc3}
                            valueField={'id'}
                            onChange={setATC3}
                        />
                        <MultiSelect
                            label={"Dosage Form"}
                            options={allDosageForm}
                            selected={dosageForm}
                            valueField={'id'}
                            onChange={setDosageForm}
                        />
                        <MultiSelect
                            label={"Package Size"}
                            options={allPackageSize}
                            selected={packageSize}
                            valueField={'id'}
                            onChange={setPackageSize}
                        />
                        <MultiSelect
                            label={"Dosage"}
                            options={allDosage}
                            selected={dosage}
                            valueField={'id'}
                            onChange={setDosage}
                        />
                        <MultiSelect
                            label={"Person with Trading License"}
                            options={allPersonWithTradingLicense}
                            selected={personWithTradingLicense}
                            valueField={'id'}
                            onChange={setPersonWithTradingLicense}
                        />
                        <MultiSelect
                            label={"Person Interested In Registration Georgia Stand"}
                            options={allPersonInterestedInRegistrationGeorgiaStand}
                            selected={personInterestedInRegistrationGeorgiaStand}
                            valueField={'id'}
                            onChange={setPersonInterestedInRegistrationGeorgiaStand}
                        />
                        <MultiSelect
                            label={"Interested Party"}
                            options={allInterestedParty}
                            selected={interestedParty}
                            valueField={'id'}
                            onChange={setInterestedParty}
                        />
                        <MultiSelect
                            label={"rxOtc"}
                            options={allRxOtc}
                            selected={rxOtc}
                            valueField={'id'}
                            onChange={setRxOtc}
                        />
                        <MultiSelect
                            label={"Mode Of Registration"}
                            options={allModeOfRegistration}
                            selected={modeOfRegistration}
                            valueField={'id'}
                            onChange={setModeOfRegistration}
                        />
                        <MultiSelect
                            label={"SKU"}
                            options={allSku}
                            selected={sku}
                            valueField={'id'}
                            onChange={setSku}
                        />
                        <MultiSelect
                            label={"Price Source"}
                            options={allPriceSource}
                            selected={priceSource}
                            valueField={'id'}
                            onChange={setPriceSource}
                        />
                        {/*{*/}
                        {/*    !filterLoader ? <Loader/> :*/}
                        <button
                            onClick={() => {
                                filterPermissions()
                            }}
                            style={button}
                        >
                            Save
                        </button>
                        {/*}*/}

                        <button onClick={() => setEditingUser(null)} style={button}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Modal Create */}
            {isCreating && (
                <div style={modalBackdrop}>
                    <div style={modal}>
                        <h3>Create User</h3>
                        <input
                            placeholder="Firstname"
                            required
                            value={newUser.firstname}
                            onChange={(e) => setNewUser({...newUser, firstname: e.target.value})}
                            style={input}
                        />
                        <input
                            placeholder="Lastname"
                            required
                            value={newUser.lastname}
                            onChange={(e) => setNewUser({...newUser, lastname: e.target.value})}
                            style={input}
                        />
                        <input
                            placeholder="Login"
                            required
                            value={newUser.login}
                            onChange={(e) => setNewUser({...newUser, login: e.target.value})}
                            style={input}
                        />
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                            style={input}
                        />
                        <select
                            value={newUser.role}
                            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                            style={input}
                        >
                            <option value="USER">user</option>
                            <option value="ADMIN">admin</option>
                        </select>
                        <button onClick={handleCreateUser} style={button}>
                            Create
                        </button>
                        <button onClick={() => setIsCreating(false)} style={button}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const cell = {
    padding: 8,
    border: "1px solid #ccc",
};

const modalBackdrop = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
};

const modal = {
    background: "#fff",
    padding: 20,
    borderRadius: 8,
    width: 600,
    height: "85vh",
    overflowY: "scroll"
};

const input = {
    width: "90%",
    marginBottom: 10,
    padding: 8,
    border: "1px solid #ccc",
    borderRadius: 4,
};

const button = {
    marginRight: 10,
    padding: "6px 12px",
    border: "none",
    borderRadius: 4,
    fontSize: 16,
    backgroundColor: "#135d31",
    color: "#fff",
    cursor: "pointer",
};

export default AdminPage;
