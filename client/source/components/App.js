import React from 'react'
import { connect } from 'react-redux'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import { getTodos } from '../actions'
import store from '../stores/store'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onLoadFetchTodos()
  }

  render() {
    return (
      <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    );
  }
}

//空でも良いので、mapStateToPropsを記述
const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch,state) => {
  return {
    onLoadFetchTodos: () => {
      dispatch(getTodos())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
