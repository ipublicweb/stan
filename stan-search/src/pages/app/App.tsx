import React from 'react';
import './App.css';
import { Dashboard } from "../../components/dashboard/dashboard";
import { INTEGRATION_VERSION } from "../../services/api/integrations/integration-configuration";

function App() {
    return (
        <div className="root">
            <div className="container">
                <div className="header">
                    ...STAN SEARCH PROJECT... (integration version: {INTEGRATION_VERSION})
                </div>
                <div className="content">
                    <Dashboard/>
                </div>
            </div>
        </div>
    );
}

export default App;
