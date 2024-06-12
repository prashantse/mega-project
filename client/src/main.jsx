// main.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import User from './components/User.jsx';
import Github, { githubInfoLoader } from './components/Github.jsx';
import Medicines from './components/MedicinePage.jsx';
import MedicineDetail from './components/MedicineDetail.jsx';
import AddNewMedicine from './components/AddNewMedicine.jsx';
import MedicineUpdateForm from './components/MedicineUpdateForm.jsx'; // Import the new component
import Search from './components/Search';
import AlertPage from './components/AlertPage.jsx';
import axios from 'axios';
import UpdateMedicine from './components/UpdateMedicine.jsx';
// import GenInvoice from './components/GenInvoice.jsx';
import InvoicePage from './components/InvoicePage.jsx'; // Import the new component
import LoginPage from './components/LoginPage';
import RegisterSuperadminPage from './components/RegisterSuperadminPage';
import AddEmployee from './components/AddEmployeePage.jsx';
import SuperadminHomePage from './components/SuperadminHomePage';
// import image from './components/Images/agra_bg.jpeg';


const Main = () => {

  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000')
    .then(result => setMedicines(result.data))
    .catch(err => console.log(err));
  }, []);
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home medicines={medicines} />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='user/:userid' element={<User />} />
        <Route path="/search" component={() => <Search medicines={medicines} />} />
        <Route path='medicines' element={<Medicines medicines={medicines}/>} />
        <Route path='medicine/:id' element={ <MedicineDetail medicines={medicines} /> }/>
        <Route path='medicine/:id/update'element={<UpdateMedicine medicines={medicines}/>}/>
        <Route path='/alertpage' element={<AlertPage medicines={medicines} />} />
        <Route path='/addNewmedicine'element={ <AddNewMedicine />} />
        {/* <Route path='/geninvoice' element={<GenInvoice  />} /> */}
        <Route path='/invoice' element={<InvoicePage medicines={medicines} />} />
        <Route path="/login" element={<LoginPage />} />
          <Route path="/register/superadmin" element={<RegisterSuperadminPage />} />
          {/* <Route path="/add-employee" element={<AddEmployeePage />} /> */}
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/superadminhome" element={<SuperadminHomePage />} />
          <Route path="/add-employee" element={<AddEmployee />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Route>
      
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
