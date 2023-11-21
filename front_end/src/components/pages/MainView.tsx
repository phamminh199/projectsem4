// recft_clsx_module_scss
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import styles from './main.module.scss'     //file scss cùng cấp
import MenuBar from '../share/MenuBar';
import ShowJob from './candidate/ShowJob';
import EmployerHome from './employer/EmployerHome';
import PostJob from './employer/PostJob';
import EmployerIntro from './employer/EmployerIntro';
import ControllerIntro from './controller/ControllerIntro';
import ControllerHome from './controller/ControllerHome';
import ManageController from './controller/ManageController';
import SignIn from './candidate/Signin';
import SignUp from './candidate/Signup';
import CreateResume from './candidate/CreateResume';
import ManageComment from './controller/ControllerComment';
import ManageCandidate from './controller/ManageCandidate';
import ManageEmployer from './controller/ManageEmployer';
import ManageJob from './controller/ManageJob';
import Report from './controller/Report';
import ControllerMonitorBehavior from './controller/ControllerMonitorBehavior';
import EmployerListPostedJob from './employer/EmployerListPostedJob';
import ManageJobEmployer from './employer/ManageJobEmployer';
import EmployerCreateAccount from './employer/EmployerCreateAccount';
import Test from './candidate/Test';
import Draft2 from './candidate/Draft2';
import PredictSalary from './candidate/PredictSalary';
import UpdateJob from './employer/updateJob';
import ListAppliedCV from './employer/ListAppliedCV';
import Instruction from './candidate/Instruction';

function MainView() {

    type stateObj = {
        [key: string]: any;
    };
        // đặt trong hàm
    const [stateParentUserSignIn, setStateParentUserSignIn] = useState<stateObj>({})

    const update_stateParentUserSignIn = (userSignInFromComponentSignIn: any) => {
        
        setStateParentUserSignIn(userSignInFromComponentSignIn);
        
    }

    return (
        <div className={clsx(styles.component_MainView)}>
            <MenuBar stateParentUserSignIn={stateParentUserSignIn}/>
            <Routes> 
                <Route path="/" element={<ShowJob/> } />
                {/* <Route path="/draft" element={<Draft2/> } /> */}
                <Route path="/alljobs" element={<ShowJob/> } />
                <Route path="/employerHome" element={<EmployerHome/> } />
                <Route path="/signin" element={<SignIn update_stateParentUserSignIn={update_stateParentUserSignIn}/> } />
                <Route path="/signup" element={<SignUp/> } />
                <Route path="/cvtemplate" element={<CreateResume/> } />
                <Route path="/test" element={<Test/> } />
                <Route path="/instruction" element={<Instruction/> } />
                <Route path="/predictsalary" element={<PredictSalary/> } />
                <Route path="/employer/*" element={<EmployerHome />}>
                    <Route path='' element={<EmployerIntro/> } />
                    {/* <Route path='Home' element={<EmployerIntro/> } /> */}
                    <Route path='postjob' element={<PostJob/> } />
                    <Route path='updateJob' element={<UpdateJob/> } />
                    <Route path='listpostedjobs' element={<EmployerListPostedJob/> } />
                    <Route path='listappliedcv' element={<ListAppliedCV/> } />
                    <Route path='createaccountemployer' element={<EmployerCreateAccount/> } />
                    {/* path='' bỏ trống là vì mình muốn mặc định ngay ban đầu là nó vào component này */}
                </Route>
                {/* lưu ý ở component EmployerHome muốn hiện ra các component con EmployerIntro, PostJob... chỗ nào thì chỗ đó phải khai báo <Outlet /> */}
                <Route path="/controller/*" element={<ControllerHome />}>
                    {/* <Route path='' element={<ControllerIntro/> } /> */}
                    <Route path='' element={<Report/> } />
                    <Route path='reports' element={<Report/> } />
                    <Route path='Home' element={<ControllerIntro/> } />
                    <Route path='managecontroller' element={<ManageController/>} />
                    <Route path='managecandidate' element={<ManageCandidate/>} />
                    <Route path='manageemployer' element={<ManageEmployer/>} />
                    <Route path='managecomment' element={<ManageComment/> } />
                    <Route path='managejob' element={<ManageJob/> } />
                    <Route path='monitorbehavior' element={<ControllerMonitorBehavior/> } />
                    {/* path='' bỏ trống là vì mình muốn mặc định ngay ban đầu là nó vào component này */}
                </Route>
                {/* lưu ý ở component EmployerHome muốn hiện ra các component con EmployerIntro, PostJob... chỗ nào thì chỗ đó phải khai báo <Outlet /> */}
            </Routes>
        </div>
    )
}
export default MainView

// https://docs.microsoft.com/en-us/rest/api/power-bi/