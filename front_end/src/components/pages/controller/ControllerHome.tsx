import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import { useSelector, useDispatch} from 'react-redux';
import { selectSkillClicked } from '../../../features/jobSlice';
import styles from '../main.module.scss'     
import ControllerSidebar from './ControllerSidebar';

function ControllerHome() {

   const [todo, setTodo] = useState("");

   return (
      <div className={clsx(styles.component_ControllerHome)}>
         <ControllerSidebar/>
         <Outlet/>
      </div>
   )
}
export default ControllerHome