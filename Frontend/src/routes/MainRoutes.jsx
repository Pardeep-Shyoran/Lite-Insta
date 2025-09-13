import { Route, Routes, useLocation } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import Navbar from '../components/Navbar/NavBar'

const MainRoutes = () => {

    const location = useLocation();

    const isFound = location.pathname === '/404' || !['/', '/login', '/register'].includes(location.pathname);

    return (
        <>
            {!isFound && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    )
}

export default MainRoutes