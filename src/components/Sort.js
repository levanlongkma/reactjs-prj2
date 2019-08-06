import React, { Component } from 'react'

class Sort extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sort: {
                by: 'name',
                value: 1
            }
        }
    }

     onSort = async (sortName, sortValue) => {
        await this.setState({
            sort: {
                by: sortName,
                value: sortValue
            }
        })

        this.props.sort(sortName, sortValue)
    }

    render() {
        var { sort } = this.state

        return (
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li onClick={ () => this.onSort('name', 1) }>
                        <a role="button" className={ sort.by == 'name' && sort.value == 1 ? 'sort-selected' : ''}>
                            <span className="fa fa-sort-alpha-asc pr-5">
                                Tên A-Z
                            </span>
                        </a>
                    </li>
                    <li onClick={ () => this.onSort('name', -1) }>
                        <a role="button" className={ sort.by == 'name' && sort.value == -1 ? 'sort-selected' : ''}>
                            <span className="fa fa-sort-alpha-desc pr-5">
                                Tên Z-A
                            </span>
                        </a>
                    </li>
                    <li role="separator" className="divider"></li>
                    <li onClick={ () => this.onSort('status', 1) }>
                        <a role="button" className={ sort.by == 'status' && sort.value == 1 ? 'sort-selected' : ''}>Trạng Thái Kích Hoạt</a>
                    </li>
                    <li onClick={ () => this.onSort('status', -1) }>
                        <a role="button" className={ sort.by == 'status' && sort.value == -1 ? 'sort-selected' : ''}>Trạng Thái Ẩn</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Sort