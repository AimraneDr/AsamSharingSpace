import { useState } from "react";
import Sidebar from "@/Components/Authenticated/Sidebar";
import Header from "@/Components/Authenticated/Header";
import { AuthProvider } from "@/Contexts/AuthContext";

export default function Authenticated({ user, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <AuthProvider userRef={user}>
            <div className="flex max-h-screen h-screen relativ">
                {/* <!-- ===== Sidebar Start ===== --> */}
                <Sidebar />
                {/* <!-- ===== Sidebar End ===== --> */}

                {/* <!-- ===== Content Area Start ===== --> */}
                <div className="grid grid-rows-8 grid-cols-1 w-full 3xl:grid-rows-10">
                    {/* <!-- ===== Header Start ===== --> */}
                    <header className="bg-white shadow row-span-1 z-99">
                        <div className="max-w-7xl mx-auto py-3 px-2 sm:px-6 lg:px-8 ">
                            <Header />
                        </div>
                    </header>
                    {/* <!-- ===== Header End ===== --> */}

                    {/* <!-- ===== Main Content Start ===== --> */}
                    <main className="w-full h-full max-h-full relative row-span-7 3xl:row-span-9">
                        {children}
                    </main>
                    {/* <!-- ===== Main Content End ===== --> */}
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
            </div>
        </AuthProvider>
    );
}
