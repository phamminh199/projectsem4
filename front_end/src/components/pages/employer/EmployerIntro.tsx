import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import styles from '../main.module.scss' 
import { useSelector, useDispatch} from 'react-redux';
import { ROUTE_NAME_EMPLOYER, EmployerSidebarRoute  } from '../../share/route-option';

function EmployerIntro() {
    const navigate = useNavigate(); //hook dùng để chuyển trang web

    return (
        <div className={clsx(styles.component_EmployerIntro)}>
            <h1>EMPLOYER DASHBOARD</h1>
            <div className={clsx(styles.boxWrapper)}>
                {
                    EmployerSidebarRoute.map((object, index) => {
                        return (
                            <div key={object.id} className={clsx(styles.box)}>
                                <Link to={object.path} className={clsx(styles.item)} >
                                    {object.title}
                                </Link>
                                {/* 
                                Link này nằm trong component EmployerIntro vì vậy khi nhấn vào Link này nó sẽ / tiếp theo đến các địa chỉ khác, 
                                nên nếu đường dẫn đến component này ban đầu là
                                http://localhost:3000/employer/home
                                thì sau khi nhấn Link bất kì nó sẽ là http://localhost:3000/employer/home/postjob
                                => dẫn đến sai cấu trúc route, vì ta chỉ cần http://localhost:3000/employer/postjob
                                nên đường dẫn đến component này chỉ nên khai báo là "" chứ ko nên khai báo là "home"
                                */}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default EmployerIntro