import React, {useEffect} from 'react';

import apiClient from "../api/client";
import authStorage from "../auth/storage";
import settings from "../config/settings";
import useAuth from '../hooks/useAuth';


function ApiInterceptor(props) {
    const {logout} = useAuth();
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
                                refreshing = refreshing ? refreshing : apiClient.refreshToken(token.refreshToken);
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
