import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import MainComponent from '../components/MainComponent'
import authHandler from './authHandler'

export var PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => authHandler.loggedIn() ? <MainComponent page={<Component/>} /> : < Redirect to='/' />} />
)