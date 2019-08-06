import React, { Component } from 'react'

class TaskItem extends Component {
    constructor(props) {
        super(props)
    }

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.item.id)
    }

    onDelete = () => {
        this.props.onDelete(this.props.item.id)
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.item.id)
    }

    render() {
        var { item, index } = this.props

        return (
            <tr>
                <td className="text-center">{ index + 1 }</td>
                <td>{ item.name }</td>
                <td className="text-center">
                    <span onClick={ this.onUpdateStatus } className={ item.status ? 'label label-success' : 'label label-danger' }>
                        { item.status ? 'Kích Hoạt' : 'Ẩn' }
                    </span>
                </td>
                <td className="text-center">
                    <button onClick={ this.onUpdate } type="button" className="btn btn-warning">
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button onClick={ this.onDelete } type="button" className="btn btn-danger">
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        )
    }
}

export default TaskItem