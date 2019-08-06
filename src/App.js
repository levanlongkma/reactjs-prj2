import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm'
import Control from './components/Control'
import TaskList from './components/TaskList'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEditing: [],
            filter: {
                filterName: '',
                filterStatus: -1
            },
            search: {
                name: ''
            },
            sort: {
                by: '',
                value: 1
            }
        }
    };

    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            let tasks = JSON.parse(localStorage.getItem('tasks'))

            this.setState({
                tasks: tasks
            })
        }
    };

    onAdd = () => {
        this.setState({
            isDisplayForm: !this.state.isDisplayForm,
            taskEditing: null
        })
    };

    onCloseForm = isDisplayForm => {
        this.setState({
            isDisplayForm: isDisplayForm
        })
    }

    onSubmitAdd = (data) => {
        var { tasks } = this.state
        
        if (data.id) { //edit
            this.helper(data.id, tasks, 'update', data)
        } else { //create
            data.id = this.gennertateID();
            tasks.push(data);
        }
        
        this.setState({
            tasks: tasks
        })

        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    }

    gennertateID() {
        return this.s4() + '-' + this.s4();
    }

    onUpdateStatus = id => {
        var tasks = this.state.tasks

        this.helper(id, tasks, 'status');
    }

    onDelete = id => {
        var tasks = this.state.tasks

        this.helper(id, tasks, 'delete');
        this.onCloseForm();
    }

    helper = (id, tasks, type = 'find', condition) => {
        var find;
        tasks.forEach((item, index) => {
            if (item.id === id) {
                switch (type) {
                    case 'status': 
                        item.status = !item.status
                        break;
                    case 'delete':
                        tasks.splice(index, 1);
                        break
                    case 'update':
                        item.name = condition.name
                        item.status = parseInt(condition.status);
                        break
                    default:
                        find = item;
                        break
                }
            }
        })

        if (type === 'find') {
            return find
        }

        this.setState({
            tasks: tasks,
            taskEditing: null
        })

        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    onUpdate = id => {
        var tasks = this.state.tasks
        var taskEditting = this.helper(id, tasks);

        this.setState({
            taskEditing: taskEditting
        })
        this.onShowForm()
    }

    onShowForm() {
        this.setState({
            isDisplayForm: true
        })
    }

    onFilter = (filterName, filterStatus) => {
        this.setState({
            filter: {
                filterName: filterName.toLowerCase(),
                filterStatus: filterStatus
            }
        })
    }

    onSearch = (data) => {
        this.setState({
            search: {
                name: data.name
            }
        })
    }

    onSort = (sortBy, sortvalue) => {
        this.setState({
            sort: {
                by: sortBy,
                value: sortvalue
            }
        })
    }

    render() {
        var { tasks, isDisplayForm, taskEditing, filter, search, sort } = this.state
        if (filter) {
            if (filter.filterName) {
                tasks = tasks.filter((item) => {
                    return item.name.toLowerCase().indexOf(filter.filterName) !== -1;
                })
            }

            tasks = tasks.filter((item) => {
                if (filter.filterStatus == -1) {
                    return item
                }

                return item.status == parseInt(filter.filterStatus)
            })

            if (search.name) {
                tasks = tasks.filter((item) => {
                    return item.name.toLowerCase().indexOf(search.name) !== -1;
                })
            }
            
            if (sort.by === 'name') {
                tasks.sort((a, b) => {
                    if (a.name > b.name ) return sort.value
                    else if (a.name < b.name) return -sort.value
                    else return 0
                })
            } else {
                tasks.sort((a, b) => {
                    if (a.status > b.status ) return -sort.value
                    else if (a.status < b.status) return sort.value
                    else return 0
                })
            }
        }
        
        var elementDisplayForm = isDisplayForm ? <TaskForm 
                                                    onSubmitAdd={ this.onSubmitAdd } 
                                                    onCloseForm={ this.onCloseForm }
                                                    task={ taskEditing }>
                                                </TaskForm> : ''

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
                        { elementDisplayForm }
                    </div>
                    <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <button onClick={ this.onAdd } type="button" className="btn btn-primary">
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>
                        <br/>
                        <br/>
                        <div className="row mt-15">
                            <Control search={ this.onSearch } sort={ this.onSort }></Control>
                        </div>
                        <br/>
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList 
                                    onUpdateStatus={ this.onUpdateStatus } 
                                    tasks={ tasks }
                                    onDelete={ this.onDelete }
                                    onUpdate={ this.onUpdate }
                                    onFilter={ this.onFilter }>
                                </TaskList>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
