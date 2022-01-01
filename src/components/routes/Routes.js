import React from "react";
import SignUp from "../login/SignUp";
import SignIn from '../login/SignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "../contexts/Auth";
import { ShowEvents } from "./ShowEvents";

const Rt = () => (
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route exact path="/" element={<SignIn />} />,
                <Route exact path="/sign-in" element={<SignIn />} />,
                <Route exact path="/sign-up" element={<SignUp />} />,
                <Route exact path="/event-calendar" element={<ShowEvents />} />     
            </Routes>
        </AuthProvider>
    </BrowserRouter>
);
export default Rt;