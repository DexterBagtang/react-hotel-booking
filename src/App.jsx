import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Bookings from "./pages/Bookings.jsx";
import Cabins from "./pages/Cabins.jsx";
import Users from "./pages/Users.jsx";
import Settings from "./pages/Settings.jsx";
import Login from "./pages/Login.jsx";
import Account from "./pages/Account.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import GlobalStyles from "./styles/GlobalStyles.js";
import AppLayout from "./ui/AppLayout.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Toaster} from "react-hot-toast";
import Booking from "./pages/Booking.jsx";
import {Checkin} from "./pages/Checkin.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
        },
    }
})

export default function App() {
    return (

        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>
            <GlobalStyles/>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout/>}>
                        <Route index element={<Navigate to="/dashboard"/>}/>
                        <Route path='dashboard' element={<Dashboard/>}/>
                        <Route path='bookings' element={<Bookings/>}/>
                        <Route path='bookings/:bookingId' element={<Booking/>}/>
                        <Route path='checkin/:bookingId' element={<Checkin/>}/>
                        <Route path='cabins' element={<Cabins/>}/>
                        <Route path='users' element={<Users/>}/>
                        <Route path='settings' element={<Settings/>}/>
                        <Route path='account' element={<Account/>}/>
                    </Route>
                    <Route path='login' element={<Login/>}/>
                    <Route path='*' element={<PageNotFound/>}/>
                </Routes>

            </BrowserRouter>
            <Toaster position="top-center" gutter={12}
                     containerStyle={{margin:'8px'}}
                     toastOptions={{
                         success:{
                             duration:3000,
                         },
                         error:{
                             duration:5000,
                         },
                         style: {
                             fontSize: '16px',
                             maxWidth:'500px',
                             padding: "16px 24px",
                             backgroundColor: "var(--color-grey-0)",
                             color:"var(--color-grey-700)",
                         },

                     }}
            />
        </QueryClientProvider>
    )
}