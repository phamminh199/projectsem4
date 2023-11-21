import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import styles from '../main.module.scss' 
import { useSelector, useDispatch} from 'react-redux';
import { ROUTE_NAME_EMPLOYER, ControllerSidebarRoute  } from '../../share/route-option';

function ControllerIntro() {
    const navigate = useNavigate(); //hook dùng để chuyển trang web
    const postjob = () => {

        navigate("/controller/postjob", { replace: true }); //chuyển đến trang successLogin <Route path="/successLogin" element={<SuccessLogin/> } />
    }

    return (
        <div className={clsx(styles.component_ControllerIntro)}>
            <h1>CONTROLLER DASHBOARD</h1>
            <div className={clsx(styles.boxWrapper)}>
            {
                ControllerSidebarRoute.map((object, index) => {
                    return (
                        <div key={object.id} className={clsx(styles.box)}>
                            <Link to={object.path} className={clsx(styles.item)} >
                                {object.title}
                            </Link>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}
export default ControllerIntro