import { Routes, Route } from 'react-router-dom';
import './Styles_globals/App.css'; 



/*============================================ / *REDISEÑADOS* / =============================================*/
import HomePage from './Views/HomePage';
import UserDashboard from './Views/userDashboard';
import AuthV2 from './Views/authV2'
import Planes from './Views/Planes';
import AdminDashb from './Views/adminDash';
import MovieLibrary from './Views/movieLibrary'
import DashboardHome from './Views/DashboardHome';
import Statistics from './Views/Statistics';
import Logs from './Views/Logs';
import PopoverAdmin from './Views/PopoverAdmin';












function App() {
  return(
   
      <div className='App'>
       
          <Routes>
            <Route path='/homePage' element={<HomePage/>} /> {/* Ruta para la pagina de inicio*/}
            <Route path='/adminDash' element={<AdminDashb/>} ></Route>
            <Route path='/authV2' element={<AuthV2/>} ></Route>
            <Route path='/userDashboard' element={<UserDashboard />}></Route>
            <Route path='/planes' element={<Planes/>} ></Route>
            <Route path='/movieLibrary' element={<MovieLibrary/>} ></Route>
            <Route path='dashboardHome' element={<DashboardHome/>} ></Route>
            <Route path='/statistics' element={<Statistics/>} ></Route>
            <Route path='/logs' element={<Logs/>} ></Route>
            <Route path='/popoverAdmin' element={<PopoverAdmin/>} ></Route>
          </Routes>
      

      </div>
   
  )




}









export default App;








