import React from 'react'
import {
    Link
} from 'react-router'

class PageNotFound extends React.Component {
    render(){
        return (
            <div>
                <h1>404 页面找不到</h1>
                <p>回到<Link to="/">主页</Link></p>
            </div>
        )
    }
}

module.exports = PageNotFound