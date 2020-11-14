import React from "react"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Login from "../components/Signin"



const Signin = () => {
    return (
        <div>

            <Header />
            <div className="container">
                <Navbar />
                <div >
                    <Login />
                <Footer />
                </div>
                
            </div>
        </div>
    )
}

export default Signin

