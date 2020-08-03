import React from 'react'
import { Router } from "@reach/router"

import { Admin, PhoneDetails, PhoneExplorer, PhoneSearch } from "../views";

export default props => {
    return (
        <Router>
            <PhoneExplorer path="/" />
            <PhoneDetails path="/details/:phoneID" />
            <PhoneSearch path="/search/" />
            <Admin path="/admin/" />
        </Router>
    )
}