// useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = (isAdminPage) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isAdmin = localStorage.getItem('isAdmin')
        console.log(isAdmin);

        // Check if the user is logged in
        if (!token) {
            navigate('/'); // Redirect to login if not authenticated
            return;
        }

        // If the page is an admin page, check if the user is an admin
        if (isAdminPage && (!isAdmin)) {
            navigate('/'); // TODO: navigatr to user/home
            return;
        }

        // If the page is a user page, check if the user is a regular user or admin
        if (!isAdminPage && isAdmin) {
            navigate('/admin/home');  
            return;
        }
    }, [isAdminPage, navigate]); // Dependencies include isAdminPage and navigate
};

export default useAuth;
