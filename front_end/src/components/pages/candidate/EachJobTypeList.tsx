// recft_clsx_module_scss
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import styles from '../main.module.scss'     
import { useSelector, useDispatch} from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
type JobPropType = {
    surrogateKey: number,
    idjob: number;
    jobtitle: string;
    companyname: string;
    salary: number;
    workmode: string;
    city: string;
    arrSkill: [];
    country: string,
    postdate: string,
    expiredate: string,
    viewJobDetails: any;
}

function EachJobTypeList(props: JobPropType) {
    const {idjob,jobtitle,companyname,salary,workmode,city,arrSkill,country,postdate,expiredate,viewJobDetails} = props;
    const navigate = useNavigate(); //hook dùng để chuyển trang web

    // const viewJobDetails = (idjob: number) => {
    //     localStorage.setItem('idCarClicked', String(idjob)); 
    //     navigate("/cardetails", { replace: true }); //chuyển đến trang successLogin <Route path="/successLogin" element={<SuccessLogin/> } />
    // }
    const compareJobs = (idjob: number) => {

    }
    return (
        <div className={clsx(styles.component_EachJobTypeList)}
        >
            <div className={clsx(styles.row, styles.heading)}>
                <p>#</p>
                <p>jobtitle</p>
                <p>skill</p>
                <p>companyname</p>
                <p>workmode</p>
                <p>city</p>
                <p>country</p>
                <p>postdate</p>
                <p>expiredate</p>
                <p>salary</p>
            </div>
            
            <div className={clsx(styles.row,styles.btnWrapper)}>
                <a className={clsx(styles.view)} onClick={()=>viewJobDetails(idjob)}>View</a>
                <a className={clsx(styles.compare)} onClick={()=>compareJobs(idjob)}>Compare</a>
            </div>

        </div>
    )
}
export default EachJobTypeList

