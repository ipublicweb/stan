import React from 'react';
import './App.css';
import { Dashboard } from "../../components/dashboard/dashboard";

function App() {
    return (
        <div className="root">
            <div className="container">
                <div className="header">
                    ...STAN SEARCH PROJECT...
                </div>
                <div className="content">
                    <Dashboard/>
                </div>
            </div>
        </div>
    );
}

export default App;
