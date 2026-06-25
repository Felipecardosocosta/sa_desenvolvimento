import { createBrowserRouter } from "react-router"
import Home from "../pages/Home"
import Main from "../layouts/Main"
import Login from "../pages/Login"
import DashBoard from "../pages/DashBoard"
import PrivateRouter from "../components/PrivateRoute"
import DashboardLayouts from "../layouts/DashboardLayouts"
import MedicalRecordList from "../components/MedicalRecordList"
import RegisterFormPatient from "../components/RegisterFormPatient"
import ConsultarionForm from "../components/ConsultarionForm"
import ExamsForm from "../components/ExamsFrom"
import PatientDetails from "../components/PatientDetail"



const router = createBrowserRouter([

    {
        path: '/',
        element: <Login />

    },
    {
        element: (
            <PrivateRouter>
                <DashboardLayouts />
            </PrivateRouter>
        ), children: [
            { path: "/dashboard", element: <DashBoard /> },
            { path: "/pacientes", element: <RegisterFormPatient /> },
            { path: "/prontuarios", element: <MedicalRecordList /> },
            { path: "/consultas", element: <ConsultarionForm/> },
            { path: "/exames", element: <ExamsForm/> },
            { path: "/paciente/:id", element: <PatientDetails/> }

        ]
    },
])



export default router