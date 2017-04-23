import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

// ここでcombineReducersに渡しているオブジェクトは前述のShorthand property namesが使われており、以下の定義と同義になります。
//
// const todoApp = combineReducers({
//   todos:todos,
//   visibilityFilter:visibilityFilter
// })
// Stateのtodosプロパティを更新するのがtodos.jsに定義されているReducer、StateのvisibilityFilterプロパティを更新するのがvisibilityFilter.jsに定義されているReducerの役割になります。


const rootReducer = combineReducers({
  todos,
  visibilityFilter
})

export default rootReducer