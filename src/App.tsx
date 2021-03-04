import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Sidebar from "./pages/Layout";
import Customer from "./pages/CustomerManage";
import Conversation from "./pages/Conversation";
import AutoCall from "./pages/AutoCallInterface";
import VoiceAnal from "./pages/VoiceAnalysis";
const SignIn = React.lazy(() => import("./pages/SignIn"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));

function App() {
  return (
    <BrowserRouter>
      <div className="relative flex h-screen items-center justify-center">
        {/* <DarkThemeToggle className="fixed right-20 top-10 z-50" /> */}
        {/* <DarkThemeToggle className="absolute right-3 top-3" /> */}
        
        <Suspense fallback={<Spinner color="info" aria-label="Loading..." />}>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route element = {<Sidebar /> } >
              <Route path="/home" element={<Home />} />
              <Route path="/customers" element={<Customer />}/>
              <Route path="/conversations" element={<Conversation />}/>
              <Route path="/autocalls" element={<AutoCall/>} />
              <Route path="/voiceanal" element={<VoiceAnal />} />
            </Route>
          </Routes>
          <ToastContainer />
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
