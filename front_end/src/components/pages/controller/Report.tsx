import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import styles from './report.module.scss'     
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

function Report() {


    const [chartLineData, setChartLineData] = useState<any>({
        series: [{
        name: "Sale",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        options: {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
            enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Sales Trends by Month',
            align: 'left'
        },
        grid: {
            row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
        },
    });
    const [chartPieData, setChartPieData] = useState<any>({
        series: [3641, 3117, 1242],
        options: {
            chart: {
                width: 500,
                type: 'donut',
        },
        labels: ['Ho Chi Minh', 'Ha Noi', 'Da nang'],
        title: {
            text: 'Job distribution by city',
            align: 'center'
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                width: 400
                },
                legend: {
                position: 'top'
                }
            }
            }]
        },
    });
    const [chartArea1, setChartArea1] = useState<any>({
        series: [{
            // data: randomizeArray(sparklineData)
            data: [
                77,
                2931.34,
                3306.12,
                3168.74,
                2251.4,
                2140.94,
                2063.08,
                1397,
                1520.8,
                1298.32,
                898.12,
                927.04
            ]
        }],
        options: {
            chart: {
                type: 'area',
                height: 160,
                sparkline: {
                enabled: true
                },
            },
            stroke: {
                curve: 'straight'
            },
            fill: {
                opacity: 0.3,
            },
            yaxis: {
                min: 0
            },
            colors: ['#DCE6EC'],
            title: {
                text: "",
                offsetX: 0,
                style: {
                fontSize: '24px',
                }
            },
            subtitle: {
                text: 'Sales',
                offsetX: 0,
                style: {
                fontSize: '14px',
                }
            }
            },
    });
    const [chartArea2, setChartArea2] = useState<any>({
        series: [{
            // data: randomizeArray(sparklineData)
            data: [
                77,
                2931.34,
                3306.12,
                3168.74,
                2251.4,
                2140.94,
                2063.08,
                1397,
                1520.8,
                1298.32,
                898.12,
                927.04
            ]
        }],
        options: {
            chart: {
                type: 'area',
                height: 160,
                sparkline: {
                enabled: true
                },
            },
            stroke: {
                curve: 'straight'
            },
            fill: {
                opacity: 0.3,
            },
            yaxis: {
                min: 0
            },
            colors: ['#DCE6EC'],
            title: {
                text: "",
                offsetX: 0,
                style: {
                fontSize: '24px',
                }
            },
            subtitle: {
                text: 'Sales',
                offsetX: 0,
                style: {
                fontSize: '14px',
                }
            }
            },
    });

    // Function to group by city and count objects in each group
    function groupByCityAndCount(arr:any) {
        return arr.reduce((acc:any, obj:any) => {
        const city = obj.city;
        acc[city] = (acc[city] || 0) + 1;
        return acc;
        }, {});
    }

    const [stateArrSaleByMonth, setStateArrSaleByMonth] = useState<any[]>([]);
    const splitData = (arr:any) => {
    
        let arrUniqueIdjob:any = [];
        for (let i = 0; i < arr.length; i++){
            let flag = false;

            for (let j = 0; j < arrUniqueIdjob.length; j++){
            
                if(arr[i].idjob == arrUniqueIdjob[j].idjob){
                    flag = true
                    break;
                }
            }  
            if(flag == false && arr[i].status == "paid"){
                arrUniqueIdjob.push(arr[i])
            }
        }  

        // const groupedData = arrUniqueIdjob.reduce((acc:any, obj:any) => {
        //     const date = new Date(obj.expiredate);
        //     const year = date.getFullYear();
        //     const month = date.getMonth() + 1; // Adding 1 since getMonth() returns 0-indexed month (0 for January, 1 for February, etc.)
            
        //     const key = `${year}-${month}`;
            
        //     if (!acc[key]) {
        //         acc[key] = { year, month, totalSalary: 0 };
        //     }
            
        //     acc[key].totalSalary += obj.salary;
        //     return acc;
        // }, {});

        const groupedData = arrUniqueIdjob.reduce((acc: any, obj: any) => {
            const date = new Date(obj.expiredate);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // Adding 1 since getMonth() returns 0-indexed month (0 for January, 1 for February, etc.)
            const key = `${year}-${month}`;
            
            if (!acc[key]) {
                acc[key] = { year, month, totalSalary: 0, count: 0 };
            }
            
            acc[key].totalSalary += obj.salary;
            acc[key].count += 1; // Increment the count for the specific month and year
            return acc;
        }, {});
        
        const sortedData = Object.values(groupedData).sort((a:any, b:any) => {
            if (a.year !== b.year) {
                return a.year - b.year;
            }
            return a.month - b.month;
        });

        console.log('sortedData: ', sortedData);
        
        // tính tổng sale
        let arrTotalSalaryByMonth2022:any = [];
        let totalSale = 0;
        sortedData.forEach((obj:any, index, arr) => {
            
            if(obj.year == 2022){
                arrTotalSalaryByMonth2022.push(obj.totalSalary/1000);
                totalSale += obj.totalSalary;
            }
            
        });

        // tính tổng số job
        let totalJob = arrUniqueIdjob.length.toLocaleString('en-US'); //tổng số job
        
        let arrTotalJobByMonth2022:any = [];
        sortedData.forEach((obj:any, index, arr) => {
            
            if(obj.year == 2022){
                arrTotalJobByMonth2022.push(obj.count);
            }
            
        });

        setStateArrSaleByMonth(arrTotalSalaryByMonth2022);
        let arrSample:any = [
            77,
            2931.34,
            3306.12,
            3168.74,
            2251.4,
            2140.94,
            2063.08,
            1397,
            1520.8,
            1298.32,
            898.12,
            927.04
        ]
        setChartLineData(
            {
                series: [{
                name: "Sale", 
                data: arrTotalSalaryByMonth2022
                }],
                options: {
                    chart: {
                        height: 350,
                        type: 'line',
                        zoom: {
                        enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: true
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    title: {
                        text: 'Sale Trends by Month of year 2022',
                        align: 'left'
                    },
                    grid: {
                        row: {
                        colors: ['#f3f3f3', 'transparent'],
                        opacity: 0.5
                        },
                    },
                    yaxis: {
                        title: {
                            text: 'Sale'
                        },
                        // min: 5,
                        // max: 40
                    },
                    xaxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'],
                    }
                },
            }
        )
        
        setChartArea1(
            {
                series: [{
                    // data: randomizeArray(sparklineData)
                    data: arrTotalSalaryByMonth2022
                }],
                options: {
                    chart: {
                        type: 'area',
                        height: 160,
                        sparkline: {
                        enabled: true
                        },
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    fill: {
                        opacity: 0.3,
                    },
                    // yaxis: {
                    //     min: 0
                    // },
                    dataLabels: {
                        enabled: true
                    },
                    colors: ['#DCE6EC'],
                    title: {
                        text: '$'+totalSale.toLocaleString('en-US'),
                        offsetX: 0,
                        style: {
                        fontSize: '24px',
                        }
                    },
                    subtitle: {
                        text: 'Total Sales',
                        offsetX: 0,
                        style: {
                        fontSize: '14px',
                        }
                    }
                },
            }
        )
        setChartArea2(
            {
                series: [{
                    // data: randomizeArray(sparklineData)
                    data: arrTotalJobByMonth2022
                }],
                options: {
                    chart: {
                        type: 'area',
                        height: 160,
                        sparkline: {
                        enabled: true
                        },
                    },
                    dataLabels: {
                        enabled: true
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    fill: {
                        opacity: 0.3,
                    },
                    // yaxis: {
                    //     min: 0
                    // },
                    xaxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'],
                    },
                    colors: ['#DCE6EC'],
                    title: {
                        text: totalJob.toLocaleString('en-US'),
                        offsetX: 0,
                        style: {
                        fontSize: '24px',
                        }
                    },
                    subtitle: {
                        text: 'Total Jobs 2022',
                        offsetX: 0,
                        style: {
                        fontSize: '14px',
                        }
                    }
                },
            }
        )

        
        // Call the function with the sample array
        const groupedJobByCity = groupByCityAndCount(arrUniqueIdjob);
        
        // console.log(groupedJobByCity);
    }

    const getData = async () => {
        try {
            const response: any = await collectionAPI.findAllViewjobskillemployercompany(); //phải có await nghĩa là khi nào có data rồi thì mới lấy
            splitData(response.data);
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
        <div className={clsx(styles.component_Report)}>
            <div className={clsx(styles.main)}>
                    
                <div className={clsx(styles.headerWrapper)}>
                    {/* <h1>MANAGE JOB</h1> */}
                    <div className={clsx(styles.miniMenu)}>
                        <ToggleButtonGroup
                        orientation="horizontal"
                        value={stateView}
                        exclusive
                        // border: 1px solid blue;
                        size="small"
                        onChange={handleChangeView}
                        className={clsx(styles.left)}
                        >
                            <ToggleButton value="dashboard" aria-label="dashboard">
                            {/* <ViewModuleIcon /> */}
                            <span className={clsx(styles.kind)}>dashboard</span>
                            </ToggleButton>
                            <ToggleButton value="pending" aria-label="pending">
                            <span className={clsx(styles.kind)}>pending</span>
                            </ToggleButton>
                            <ToggleButton value="approved" aria-label="approved">
                            <span className={clsx(styles.kind)}>approve</span>
                            </ToggleButton>
                            <ToggleButton value="complete" aria-label="complete">
                            <span className={clsx(styles.kind)}>complete</span>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </div>
                <div className={clsx(styles.container)} >
                    {(() => {
                        if (stateView === "dashboard") {
                            return (
                                <>
                                    <div className={clsx(styles.viewDashboard)}>
                                        <div className={clsx(styles.row1)}>
                                            <div id="chart-spark1" className={clsx(styles.box)}>
                                                <ReactApexChart options={chartArea1.options} series={chartArea1.series} type="area" height={160} />
                                            </div>
                                            <div className={clsx(styles.box)}>
                                                <ReactApexChart options={chartArea2.options} series={chartArea2.series} type="area" height={160} />
                                            </div>
                                            <div className={clsx(styles.box)}>
                                                <ReactApexChart options={chartArea1.options} series={chartArea1.series} type="area" height={160} />
                                            </div>
                                            {/* <div id="chartLine" className={clsx(styles.chartLine)}>
                                            </div> */}
                                        </div>
                                        <div className={clsx(styles.row2)}>
                                            <div id="chartLine" className={clsx(styles.chartLine)}>
                                                <ReactApexChart options={chartLineData.options} series={chartLineData.series} type="line" height={350} />
                                            </div>
                                            <div id="chartPie" className={clsx(styles.chartPie)}>
                                                <ReactApexChart options={chartPieData.options} series={chartPieData.series} type="pie" width={380} />
                                            </div>
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
export default Report