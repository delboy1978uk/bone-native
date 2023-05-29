import React, {useEffect} from 'react';

import apiClient from "../api/client";
import authStorage from "../auth/storage";
import settings from "../config/settings";
import useAuth from '../hooks/useAuth';

// call to refresh an access token using our refresh token
const refreshToken = async (token) => {
    const formData = new FormData();
    formData.append('client_id', settings.clientId);
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', token);
    formData.append('scope', 'basic');

    const result = await apiClient.post(settings.discovery.tokenEndpoint, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
    });

    const newToken = {
        accessToken: result.data.access_token,
        expiresIn: result.data.expires_in,
        refreshToken: result.data.refresh_token,
        tokenType: result.data.token_type,
    };
    authStorage.storeAuthToken(newToken);

    return newToken;
}

function ApiInterceptor(props) {
    const {user, logout} = useAuth();
    let refreshing = null;

    const addTransformers = () => {

        const requestTransformers = apiClient.asyncRequestTransforms.length;
        const responseTransformers = apiClient.asyncResponseTransforms.length;
        const transformersAdded = requestTransformers + responseTransformers > 1;

        if (!transformersAdded) {
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
                        // settimng retry flag to allow retrying once and not loop infinitely
                        originalConfig.retry = true;
                        try {
                            const token = await authStorage.getAuthToken();
                            if (token) {
                                // first request to refresh will call the method, all the other requests will await the promise
                                // so only one call to refresh will be made in the case of multile async 401s
                                refreshing = refreshing ? refreshing : refreshToken(token.refreshToken);
                                await refreshing;
                                refreshing = null;

                                return apiClient.any(originalConfig);
                            } else {
                                return logout();
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
    }

    useEffect( () => {
        addTransformers();
    }, []);

    return null;
}

export default ApiInterceptor;
