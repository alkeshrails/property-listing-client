import './App.css';
import Dashboard from './pages/Dashboard.tsx';
import LoginForm from './pages/Login.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PropertyForm from './pages/AddProperty.tsx';
import RegistrationForm from './pages/Registration.tsx';
import PropertyDetails from './pages/PropertyDetail.tsx';
import { Favourites } from './pages/Favourites.tsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='login' element={<LoginForm />} />
          <Route path='register' element={<RegistrationForm />} />
          <Route path='add-property' element={<PropertyForm />} />
          <Route path='edit-property/:id' element={<PropertyForm type="edit" />} />
          <Route path='view-property/:id' element={<PropertyDetails/>} />
          <Route path='favourites' element={<Favourites/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
