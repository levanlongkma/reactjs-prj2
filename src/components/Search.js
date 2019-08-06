import React, { Component } from 'react'

class Search extends Component {

    constructor(props) {
        super(props)

        this.state = {
            search: {
                name: ''
            }
        }
    }

    handleOnchange = event => {
        let target = event.target
        let name = target.name
        let value = target.value

        this.setState({
            search: {
                [name]: value
            }
        })
    }

    search = () => {
        this.props.search(this.state.search)
    }

    render() {
        return (
            <div className="input-group">
                <input name="name" value={ this.state.search.name } type="text" onChange={ this.handleOnchange } className="form-control" placeholder="Nhập từ khóa..." />
                <span className="input-group-btn">
                    <button onClick={ this.search } className="btn btn-primary" type="button">
                        <span className="fa fa-search mr-5"></span>Tìm
                    </button>
                </span>
            </div>
        )
    }
}

export default Search