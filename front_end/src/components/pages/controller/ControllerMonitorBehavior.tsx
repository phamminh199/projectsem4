import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import styles from '../../pages/main.module.scss'     
import { useSelector, useDispatch} from 'react-redux';
import collectionAPI from '../../../API/collectionAPI';


// apex chart
import ReactApexChart from 'react-apexcharts';

// mui
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

function ControllerMonitorBehavior() {

    const [chartBarData, setChartBarData] = useState<any>({
        series: [{
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }],
        options: {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
            borderRadius: 4,
            borderRadiusApplication: 'end',
            horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
            'United States', 'China', 'Germany'
            ],
        }
        },
    });


    const [stateObjSearchMonitor, setStateObjSearchMonitor] = useState<stateObj>({})
    const [stateArrKey, setStateArrKey] = useState<any[]>([]);
    const [stateArrValue, setStateArrValue] = useState<any[]>([]);
    function countSearches(searchArray:any) {
        let searchCounts:any = {};
    
        // Loop through the array of objects
        for (let obj of searchArray) {
            const searchValue = obj.search;
        
            // Check if the searchValue already exists as a property in the searchCounts object
            if (searchCounts[searchValue]) {
                searchCounts[searchValue]++;
            } else {
                searchCounts[searchValue] = 1;
            }
        }
        // searchCounts
        /*
            {
                "php": 1,
                "python": 2,
                ...
            }
        */
            console.log('searchCounts: ', searchCounts);
        // setStateObjSearchMonitor(searchCounts);
        // Convert object to array of key-value pairs
        const sortedArray = Object.entries(searchCounts).sort((a:any, b:any) => b[1] - a[1]);
        // Convert the sorted array back to an object
        const sortedObject = Object.fromEntries(sortedArray);

        console.log('sortedObject: ' + JSON.stringify(sortedObject, null, 4));
        
        const keysArray = Object.keys(sortedObject); // lấy toàn bộ key của object và bỏ vào mảng keysArray
        setStateArrKey(keysArray);
        const valuesArray = Object.values(sortedObject); // lấy toàn bộ value của object và bỏ vào mảng valuesArray
        setStateArrValue(valuesArray);
        setChartBarData(
            {
                series: [{
                    data: valuesArray
                }],
                options: {
                chart: {
                    type: 'bar',
                    height: 550
                },
                plotOptions: {
                    bar: {
                    borderRadius: 4,
                    borderRadiusApplication: 'end',
                    horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: true
                },
                xaxis: {
                    categories: keysArray
                }
                },
            }
        )
    }
    

    type stateObj = {
        [key: string]: any;
    };
        // đặt trong hàm
    
    const getData = async () => {
        try {
            const response: any = await collectionAPI.findAllSearchMonitor(); //phải có await nghĩa là khi nào có data rồi thì mới lấy
            countSearches(response.data);
        }catch(err){
            console.log('err:', err);
        }
    }

    const [stateView, setStateView] = React.useState('dashboard');
    const handleChangeView = (event: React.MouseEvent<HTMLElement>, kindOfView: string) => {
       // kindOfView nó sẽ lấy giá trị value="module" value="list" value="quilt" từ ToggleButton nào đc click vào
        if(kindOfView != ""){
            setStateView(kindOfView);
        }
    };
    useEffect(() => {
        getData();
    },[]);


    return (
        <div className={clsx(styles.component_ControllerMonitorBehavior)}>
            <div className={clsx(styles.main)}>
                    
                <div className={clsx(styles.headerWrapper)}>
                    <h1>MONITOR CUSTOMER SEARCH INPUT</h1>
         
                </div>
                <div className={clsx(styles.container)} >
                {(() => {
                        if (stateView === "dashboard") {
                            return (
                                <>
                                    <div className={clsx(styles.viewDashboard)}>
                                        <div id="chartBar" className={clsx(styles.chartBar)}>
                                            <ReactApexChart options={chartBarData.options} series={chartBarData.series} type="bar" height={1500} />
                                        </div>
                                        <div className={clsx(styles.row1)}>
                                
                                        </div>
                                        <div className={clsx(styles.row2)}>
                                        
                                        </div>
                        
                                        
                                    </div>
                                </>
                            )
                        }
                    })()}
                </div>
            </div>
            {/* <button onClick={getData}>getData</button> */}
        </div>
    )
}
export default ControllerMonitorBehavior