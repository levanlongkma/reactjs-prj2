import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            status: 0
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm(false)
    }

    onChangeHandle = (event) => {
        var target = event.target
        var name = target.name
        var value = target.value

        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault()

        this.props.onSubmitAdd(this.state)
        this.onClear()
        this.onCloseForm()
    }

    onClear = () => {
        this.setState({
            name: '',
            status: 0
        })
        this.onCloseForm()
    }

    componentWillMount() {
        var { task } = this.props
        
        if (task) {
            this.setState({
                id: task.id,
                name: task.name,
                status: task.status ? 1 : 0
            })
        }
    }

    componentWillReceiveProps(nextProps) {  
        if (nextProps && nextProps.task) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status ? 1 : 0
            })
        }
    }

    render() {

        var { id } = this.state

        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { id ? 'Cập nhật công việc' : 'Thêm Công Việc' }
                        <span onClick={ this.onCloseForm } className="fa fa-times-circle text-right"></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={ this.onSubmit }>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input type="text" onChange={ this.onChangeHandle } value={ this.state.name } name="name" className="form-control" />
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control" value={ this.state.status } onChange={ this.onChangeHandle } name="status" required="required">
                            <option value={1}>Kích Hoạt</option>
                            <option value={0}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Lưu</button>&nbsp;
                            <button type="button" onClick={ this.onClear } className="btn btn-danger">Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default TaskForm;
