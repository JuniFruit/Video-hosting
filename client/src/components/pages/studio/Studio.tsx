import { FC, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
export const Studio: FC = () => {
    const { isLoading, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) return;
        if (!user) {
            navigate('/');
        };
    }, [user, isLoading])
    
    return (
        <div>Studio</div>
    )
}