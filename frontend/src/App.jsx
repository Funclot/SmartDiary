import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import api from "./services/api";
import Navbar from "./Navbar";

import {
    Routes,
    Route,
    Navigate,
    useNavigate
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

const LoginSchema = Yup.object({
    username: Yup.string()
        .required("Username is required"),

    password: Yup.string()
        .required("Password is required")
});

function LoginPage({ setIsAuth }) {

    const navigate = useNavigate();

    return (
        <div style={{ padding: "20px" }}>

            <h1>SmartDiary JWT Login</h1>

            <Formik
                initialValues={{
                    username: "",
                    password: ""
                }}

                validationSchema={LoginSchema}

                onSubmit={async (values) => {

                    try {

                        const response =
                            await api.post(
                                "/auth/login",
                                values
                            );

                        localStorage.setItem(
                            "token",
                            response.data.accessToken
                        );

                        localStorage.setItem(
                            "refreshToken",
                            response.data.refreshToken
                        );


                        localStorage.setItem(
                            "username",
                            response.data.username
                        );

                        setIsAuth(true);

                        navigate("/dashboard");

                    }
                    catch {

                        alert("Login failed");

                    }

                }}
            >

                <Form>

                    <Field
                        name="username"
                        placeholder="Username"
                    />

                    <br />

                    <ErrorMessage
                        name="username"
                    />

                    <br /><br />

                    <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                    />

                    <br />

                    <ErrorMessage
                        name="password"
                    />

                    <br /><br />

                    <button type="submit">
                        Login
                    </button>

                </Form>

            </Formik>

        </div>
    );
}

function Dashboard({ logout }) {

    return (
        <>
            <Navbar
                username={
                    localStorage.getItem("username")
                }
                logout={logout}
            />

            <div style={{ padding: "20px" }}>

                <h2>Protected Page</h2>

                <p>
                    User is authenticated
                </p>

            </div>
        </>
    );
}

function App() {

    const [isAuth, setIsAuth] = useState(
        !!localStorage.getItem("token")
    );

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");

        setIsAuth(false);

    };

    return (
        <Routes>

            <Route
                path="/"
                element={
                    isAuth
                        ? <Navigate to="/dashboard" />
                        : (
                            <LoginPage
                                setIsAuth={setIsAuth}
                            />
                        )
                }
            />

            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>

                        <Dashboard
                            logout={logout}
                        />

                    </PrivateRoute>
                }
            />

        </Routes>
    );
}

export default App;