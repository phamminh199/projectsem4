import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import { useSelector, useDispatch} from 'react-redux';
import { selectSkillClicked } from '../../../features/jobSlice';
import styles from '../main.module.scss'     
import EmployerSidebar from './EmployerSidebar';

function EmployerHome() {

   const [todo, setTodo] = useState("");

   return (
      <div className={clsx(styles.component_EmployerHome)}>
         <EmployerSidebar/>
         <Outlet/>
      </div>
   )
}
export default EmployerHome