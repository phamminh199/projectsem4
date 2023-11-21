import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import { useSelector, useDispatch} from 'react-redux';
import { selectSkillClicked } from '../../../features/jobSlice';
import styles from '../main.module.scss'     
import { ROUTE_NAME_EMPLOYER, EmployerSidebarRoute  } from '../../share/route-option';

function EmployerSidebar() {

    const [stateSidebarItems, setStateSidebarItems] = useState(EmployerSidebarRoute); //tạo state toggle và cho nội dung của nó ban đầu là mảng AdminMenuRoute
    const [defaultView, setDefaultView] = useState(true); //lý do có state này là ban đầu cho cái default view nó hiện ra, chứ nếu ko là ban đầu nó hiện ra trang trắng, khi user lick vào các item bên sidebar thì state này đc set về false để ẩn đi default view nhường chỗ lại cho các trang khác hiện ra
    
    const makeSelectedItemBlue = (title:string) => { //tạo hàm để set cho cái title nào đc click vào nó chuyển status thành true

       //cho tất cả status về false lại như ban đầu
        stateSidebarItems.forEach((obj, index, arr) => {
        
            obj.status = false;
        })
       //object nào có title trùng với selectedTitleAdminMenu thì cho status là true
        const newstateSidebarItems = stateSidebarItems.map(obj => {
        
            if (obj.title === title) {
                return {...obj, status: true};
            }
            return obj;
        });
        setStateSidebarItems(newstateSidebarItems); //cập nhật lại state toggle bằng cái mảng mới đã chuyển cái status của title đc click vào thành true
    }
    const navigate = useNavigate(); //hook dùng để chuyển trang web

    const tabClick = (title: string) => {

       makeSelectedItemBlue(title); //chạy hàm này để set cho cái title nào đc click vào nó chuyển status thành true
        console.log(title);
        switch (title) {
            case 'Home':
                navigate("/employer/Home", { replace: true }); //chuyển đến trang successLogin <Route path="/successLogin" element={<SuccessLogin/> } />
                break;
            case 'Post new job':
                navigate("/employer/postjob", { replace: true }); //chuyển đến trang successLogin <Route path="/successLogin" element={<SuccessLogin/> } />
                break;
            default:
                break;
        }
            
    }
    //mỗi khi render lại thì chạy hàm makeSelectedItemBlue 1 lần, nếu ko có cái này thì mỗi lần refresh lại nó sẽ mất màu xanh cái title đc selected
    // useEffect(() => {
    //     makeSelectedItemBlue();
    // },[]);

    return (
        <div className={clsx(styles.component_EmployerSidebar)}>
            <ul>
            {
                stateSidebarItems.map((object, index) => {
                    let title: string = object.title;
                    let status: Boolean = object.status;
                    // console.log('status', status);
                    return (
                        <li key={object.id}>
                            <Link to={object.path} onClick={() => tabClick(title)} className={clsx({[styles.selected]: status})}>
                                {object.title}
                            </Link>
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
}
export default EmployerSidebar