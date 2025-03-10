import { useEffect, useState } from 'react';
import axios from 'axios';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    useEffect(() => {
        axios
            .get('http://localhost:7000/api/check-session', { withCredentials: true })
            .then((res) => setIsAuthenticated(res.data.isAuthenticated))
            .catch(() => setIsAuthenticated(false));
    }, []);

    return isAuthenticated;
};
