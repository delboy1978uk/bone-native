import React, {useEffect} from 'react';

import apiClient from "../api/client";
import authStorage from "../auth/storage";
import settings from "../config/settings";
import useAuth from '../hooks/useAuth';

// call to refresh an access token using our refresh token
const refreshToken = async token => {
    const formData = new FormData();
    formData.append('client_id', settings.clientId);
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', token);
    formData.append('scope', 'basic');

    return apiClient.post(settings.discovery.tokenEndpoint, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
}

function ApiInterceptor(props) {
    const {logout} = useAuth();

    const addTransformers = () => {
        // add our authorisation header (and optional xdebug header) to any api client requests
        apiClient.addAsyncRequestTransform(async request => {
            const authToken = await authStorage.getAuthToken();

            if (!authToken) {
                return;
            }

            if (settings.xDebugHeader === true) {
                if (!request.params) {
                    request.params = [];
                }
                request.params['XDEBUG_SESSION'] = 'PHPSTORM';
            }

            request.headers['Authorization']  = 'Bearer ' + authToken.accessToken;
        });

        // check for a 401 response (expired access token), use refresh token to fetch new access token, retry request
        apiClient.addAsyncResponseTransform(async response => {
            if (response.ok) {
                return response.data;
            }

            if (response.problem) {
                const originalConfig = response.config;

                //Access Token was expired, grab a fresh one using the refresh token and try again
                if (originalConfig.url !== settings.discovery.authEndpoint && response.status === 401 && !originalConfig.retry) {
                    originalConfig.retry = true;
                    try {
                        const token = await authStorage.getAuthToken();
                        
                        if (token) {
                            const rs = await refreshToken(token.refreshToken);
                            const newToken = {
                                accessToken: rs.data.access_token,
                                expiresIn: rs.data.expires_in,
                                refreshToken: rs.data.refresh_token,
                                tokenType: rs.data.token_type,
                            };
                            authStorage.storeAuthToken(newToken);

                            return apiClient.any(originalConfig);
                        }
                    } catch (_error) {
                        // if we get here, the refresh token has also expired, log the user out.
                        return logout();
                    }
                }

                return Promise.reject(response.problem);
            }
        });
    }

    useEffect( () => {
        addTransformers();
    }, []);

    return null;
}

export default ApiInterceptor;
