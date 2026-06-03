import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7299/api"
});

api.interceptors.request.use(config => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(

    response => response,

    async error => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {

                const refreshToken =
                    localStorage.getItem(
                        "refreshToken"
                    );

                const response =
                    await axios.post(
                        "https://localhost:7299/api/auth/refresh",
                        {
                            refreshToken
                        }
                    );

                const newAccessToken =
                    response.data.accessToken;

                localStorage.setItem(
                    "token",
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);

            }
            catch {

                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("username");

                window.location.href = "/";

            }
        }

        return Promise.reject(error);
    }
);

export default api;