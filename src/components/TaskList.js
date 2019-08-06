import React, { Component } from 'react'
import TaskItem from './TaskItem'

class TaskList extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }

    handleOnChange = (event) => {
        var target = event.target
        var name = target.name
        var value = target.value

        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
        )

        this.setState({
            [name]: value
        })
    }

    render() {

        var { tasks } = this.props; // var tasks = this.props.tasks
        var elements = tasks.map((item, index) => {
            return  <TaskItem 
                        onDelete={ this.props.onDelete } 
                        onUpdateStatus={ this.props.onUpdateStatus }
                        onUpdate={ this.props.onUpdate } 
                        item={ item } 
                        index={ index } 
                        key={ index }>
                    </TaskItem>
        })

        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" 
                                    onChange={ this.handleOnChange } 
                                    value={ this.state.filterName } 
                                    className="form-control" 
                                    name="filterName"
                                    />
                        </td>
                        <td>
                            <select 
                                className="form-control" 
                                name="filterStatus" 
                                onChange={ this.handleOnChange } 
                                value={ this.state.filterStatus }>
                                    <option value={ -1 }>Tất Cả</option>
                                    <option value={ 0 }>Ẩn</option>
                                    <option value={ 1 }>Kích Hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    { elements }
                </tbody>
            </table>
        )
    }
}

export default TaskList