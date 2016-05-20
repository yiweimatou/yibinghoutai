import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory,useRouterHistory} from 'react-router'
import createHashHistory from 'history/lib/createHashHistory'
import Routes from './routes'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()
render(
    <Router history={useRouterHistory(createHashHistory)({ queryKey: false })}
            onUpdate={() => window.scrollTo(0, 0)}>
        {Routes}
    </Router>
    // <Router history={browserHistory}
    //         onUpdate={() => window.scrollTo(0, 0)} 
    //         routes = {Routes}
    // />
    ,document.getElementById('root')
)
