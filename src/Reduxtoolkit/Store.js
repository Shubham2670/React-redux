import {configureStore} from '@reduxjs/toolkit'
import Todoreducer from '../ReduxFeature.js/TodoSliceApi'

export const store = configureStore({
    reducer: Todoreducer
})