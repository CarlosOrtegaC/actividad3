import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MainLayout } from "./components/layout/MainLayout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Top10 from "./pages/library/Top10";
import BookList from "./pages/library/BookList";
import BookDetail from "./pages/library/BookDetail";
import Purchases from "./pages/library/Purchases";
import CoworkingList from "./pages/coworking/CoworkingList";
import SpaceDetail from "./pages/coworking/SpaceDetail";
import Reservation from "./pages/coworking/Reservation";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<MainLayout />}>
                    {/* Public Routes */}
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />

                    {/* Library Routes - Protected */}
                    <Route path="/library/top10" element={
                        <ProtectedRoute><Top10 /></ProtectedRoute>
                    } />
                    <Route path="/books" element={
                        <ProtectedRoute><BookList /></ProtectedRoute>
                    } />
                    <Route path="/books/:id" element={
                        <ProtectedRoute><BookDetail /></ProtectedRoute>
                    } />
                    <Route path="/books/purchases" element={
                        <ProtectedRoute><Purchases /></ProtectedRoute>
                    } />

                    {/* Coworking Routes - Protected */}
                    <Route path="/coworking" element={
                        <ProtectedRoute><CoworkingList /></ProtectedRoute>
                    } />
                    <Route path="/coworking/:id" element={
                        <ProtectedRoute><SpaceDetail /></ProtectedRoute>
                    } />
                    <Route path="/coworking/reserve/:id" element={
                        <ProtectedRoute><Reservation /></ProtectedRoute>
                    } />
                </Route>
            </Routes>
        </AuthProvider>
    );
}
export default App;