import React, { useState } from 'react'
import { Tabs, Tab } from '@material-ui/core';

export default props => {
    const [activeTab, setActiveTab] = useState(props.defaultTab || 0);
    const tabs = []
    const content = []
    console.log(props.children)
    props.children.forEach((child, idx) => {
        if (!child) {
            return
        }
        const tab = <Tab key={idx} label={child.props.tabLabel} />
        tabs.push(tab);
        const childBody = <div key={idx} hidden={activeTab !== idx}>
            {child}
        </div>
        content.push(childBody);
    });
    return (
        <React.Fragment>

        <Tabs value={activeTab} onChange={(_event, value) => setActiveTab(value)}>
            {tabs}
        </Tabs>
        {content}
        </React.Fragment>
    )
}
