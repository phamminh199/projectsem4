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
    viewJobDetails: any;
    addToFavorite: any;
}

function EachJobTypeModule(props: JobPropType) {
    const {idjob,jobtitle,companyname,salary,workmode,city,arrSkill,viewJobDetails,addToFavorite} = props;
    const navigate = useNavigate(); //hook dùng để chuyển trang web

    // const viewJobDetails = (idjob: number) => {
    //     localStorage.setItem('idCarClicked', String(idjob)); 
    //     navigate("/cardetails", { replace: true }); //chuyển đến trang successLogin <Route path="/successLogin" element={<SuccessLogin/> } />
    // }
    const compareJobs = (idjob: number) => {
             
         
             
    }
    return (
        <div className={clsx(styles.component_EachJobTypeModule)}
        //  onClick={()=>CarDetails(idCar)}
        >
            <div className={clsx(styles.row,styles.verticle)}>
                <p className={clsx(styles.key)}>Job Title:</p>
                <p className={clsx(styles.value)}>{jobtitle}</p>
            </div>
            <div className={clsx(styles.row,styles.verticle)}>
                <p className={clsx(styles.key)}>Company Name:</p>
                <p className={clsx(styles.value)}>{companyname}</p>
            </div>
            <div className={clsx(styles.row)}>
                <p className={clsx(styles.key)}>Salary:</p>
                <p className={clsx(styles.value)}>{salary.toLocaleString('en-US')}</p>
            </div>
            <div className={clsx(styles.row)}>
                <p className={clsx(styles.key)}>Work Mode:</p>
                <p className={clsx(styles.value)}>{workmode}</p>
            </div>
            <div className={clsx(styles.row)}>
                <p className={clsx(styles.key)}>City:</p>
                <p className={clsx(styles.value)}>{city}</p>
            </div>
            <div className={clsx(styles.row)}>
                <p className={clsx(styles.key)}>Skill:</p>
                <p className={clsx(styles.value)}>
                    <span className={clsx(styles.skillWrapper)}>
                        {
                            arrSkill.map((skill, index) => (
                                <span key={index} className={clsx(styles.skill)}>
                                {skill}
                                </span>
                            ))
                        }
                    </span>
                </p> 
            </div>
            <div className={clsx(styles.row,styles.btnWrapper)}>
                <a className={clsx(styles.view)} onClick={()=>viewJobDetails(idjob)}>View</a>
                {/* <a className={clsx(styles.compare)} onClick={()=>compareJobs(idjob)}>Compare</a> */}
                <a className={clsx(styles.compare)} onClick={()=>addToFavorite(idjob)}>Add to Favorite</a>
            </div>

        </div>
    )
}
export default EachJobTypeModule

