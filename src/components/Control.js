import React, { Component } from 'react'
import Search from './Search'
import Sort from './Sort'

class Control extends Component {
    render() {
        return (
            <div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <Search search={ this.props.search }></Search>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <Sort sort={ this.props.sort }></Sort>
                </div>
            </div>
        )
    }
}

export default Control