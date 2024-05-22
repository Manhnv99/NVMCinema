import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTE_CLIENT_ACCOUNT, ROUTE_CLIENT_HOME } from '../../../../app/BaseUrl/BaseUrl';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../../app/Constant/TokenConstant';

export const OAuth2RedirectHandler = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const getUrlParameter = ({ name }: { name: string }) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    useEffect(() => {
        const accessToken = getUrlParameter({ name: ACCESS_TOKEN });
        const refreshToken = getUrlParameter({ name: REFRESH_TOKEN });
        const error = getUrlParameter({ name: "error" });
        if (accessToken) {
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
            navigate(ROUTE_CLIENT_HOME, {
                state: {
                    from: location
                }
            });
        } else {
            navigate(ROUTE_CLIENT_ACCOUNT, {
                state: {
                    from: location,
                    error: error
                }
            });
        }
    }, []);

    return null;

};