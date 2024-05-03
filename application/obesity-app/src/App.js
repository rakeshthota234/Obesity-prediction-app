// App.js
import React, { useState } from 'react';
import './App.css'
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';
import Rating from '@mui/material/Rating';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

import Home from './pages/Home';
import Viz from './pages/Viz'



function App() {

    const [predictedCSV, setPredictedCSV] = useState([]);
    const [counts, setCounts] = useState({ ones: 0, zeroes: 0 })
    const [value, setValue] = useState(2);
    const [page, setPage] = useState(0);
    const [inputType, setInputType] = useState(0);
    const [genderCounts, setGenderCounts] = useState([])

    function valuetext(value) {
        return `${value}°C`;
    }
    const steps = ['Step 1', 'Step 2', 'Prediction'];
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());


    // functions for FORM Implementation
    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleHome = () => {
        setActiveStep(0)
        setPage(0)
    }

    const handleNext = () => {
        // let newSkipped = skipped;
        // if (isStepSkipped(activeStep)) {
        //     newSkipped = new Set(newSkipped.values());
        //     newSkipped.delete(activeStep);
        // }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // setSkipped(newSkipped);
    };



    // slider Markers
    const markers = [
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 3,
            label: '3',
        },
    ];

    // variable to store user inpit data
    const [formData, setFormData] = useState({
        Age: '',
        Sex: 0,
        Height: '',
        Weight: '',
        BMI: '',
        FamHistory: false,
        HCaloric: false,
        VegMeals: 1,
        Nmeals: 1,
        FBMeals: 1,
        H20: 1,
        Pactivity: 0,
        Tech: 1,
        Alco: 1,
        Transport: 4
    });

    // data will store prediction output from the model
    const [data, setData] = useState();

    // to render input values
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Calculate BMI function
    const calculateBMI = () => {
        const bmi = (formData.Weight / (formData.Height * formData.Height)).toFixed(2);
        return isNaN(bmi) ? '' : bmi;
    };

    // sending input data to backend
    const sendDataToBackend = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            // predicted data from the backend
            const responseData = await response.json();
            console.log(responseData)
            console.log(responseData['predictions'])
            setData(responseData['predictions']);

        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    };


    return (
        <div className='bg p-3' style={{ height: '100vh' }}>
            {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item pointer mx-1 border border-white text-center" style={{ width: "110px" }}>
                            <a className="nav-link" onClick={() => setPage(0)}> HOME </a>
                        </li>
                        <li className="nav-item pointer mx-1 border border-white text-center" style={{ width: "110px" }}>
                            <a className="nav-link" onClick={() => {
                                setPage(1)
                                setInputType(0)
                            }}> PREDICT</a>
                        </li>
                        <li className="nav-item pointer mx-1 border border-white text-center" style={{ width: "110px" }}>
                            <a className="nav-link" onClick={() => setPage(2)}> ANALYTICS</a>
                        </li>

                    </ul>
                </div>
            </nav> */}

            {
                page == 0 &&
                <div >
                    <Home setInputType={setInputType} setPage={setPage} />
                </div>
            }

            {
                page == 1 &&
                <div className='container w-75 p-4 pt-0' style={{ height: '90vh' }}>
                    <div className='d-flex justify-content-start'>
                    <div className='w-25' style={{ marginLeft: "0px" }}>

<button className='btn btn-sm btn-danger m-0 mt-2 mx-3 d-flex justify-content-center align-items-center' onClick={() => handleHome()} style={{ width: "95px", height: "35px" }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
    </svg>
    <div className='mx-1'> Home</div>
</button>
</div>
                        <h4 className="mb-4 text-center myfont">OBESITY PREDICTION SYSTEM</h4>
                    </div>

                    <hr></hr>

                    {
                        inputType == 1 &&
                        <div className='d-flex flex-column justify-content-center bg-form p-5 pt-0 myshadow' style={{ paddingLeft: "0px" }} >

                            <form className='form mx-auto row' onSubmit={sendDataToBackend}>

                                {
                                    activeStep == 0 &&
                                    <div className='m-5 mb-0'>
                                        <div className='d-flex justify-content-center'>
                                            <label>
                                                <TextField type='number'
                                                    id="age"
                                                    label="Age"
                                                    variant="outlined"
                                                    name="Age"
                                                    value={formData.Age}
                                                    onChange={handleInputChange} />
                                            </label>

                                            <label>
                                                <FormControl style={{ width: '140px' }}>
                                                    <InputLabel id="sexman">Gender</InputLabel>
                                                    <Select
                                                        labelId="sexman"
                                                        id="sexh"
                                                        value={formData.Sex}
                                                        label="Sex"
                                                        name='Sex'
                                                        onChange={handleInputChange}
                                                        autoWidth
                                                    >
                                                        <MenuItem value={0}>Male</MenuItem>
                                                        <MenuItem value={1}>Female</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </label>
                                            <label>
                                                <TextField
                                                    step="0.01"
                                                    id="height"
                                                    label="Height"
                                                    variant="outlined"
                                                    name="Height"
                                                    value={formData.Height}
                                                    placeholder="In Meters"
                                                    onChange={handleInputChange} />
                                            </label>
                                            <label>
                                                <TextField
                                                    step="0.01"
                                                    id="weight"
                                                    label="Weight"
                                                    variant="outlined"
                                                    name="Weight"
                                                    placeholder="In Kgs"
                                                    value={formData.Weight}
                                                    onChange={handleInputChange} />
                                            </label>
                                            <label>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="BMI"
                                                    variant="outlined"
                                                    name="BMI"
                                                    value={formData.BMI = calculateBMI()} aria-readonly
                                                    onChange={handleInputChange} />
                                            </label>
                                        </div>

                                        <div style={{ height: '8%' }} className='d-flex justify-content-start align-items-center'>
                                            <div className='mx-2 w-50'>Is there a Family History with overweight?</div>
                                            {/* <FormControl> */}
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="FamHistory"
                                                value={formData.FamHistory}
                                                onChange={handleInputChange}
                                            >
                                                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="0" control={<Radio />} label="No" />
                                            </RadioGroup>
                                            {/* </FormControl> */}
                                        </div>

                                        <div style={{ height: '8%' }} className='d-flex justify-content-start align-items-center' >
                                            <div className='mx-2 w-50'>Do you eat high caloric food frequently?</div>
                                            {/* <FormControl> */}
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="HCaloric"
                                                value={formData.HCaloric}
                                                onChange={handleInputChange}
                                            >
                                                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="0" control={<Radio />} label="No" />
                                            </RadioGroup>
                                            {/* </FormControl> */}
                                        </div>

                                        <div style={{ height: '8%' }} className='d-flex justify-content-start align-items-center'>
                                            <div className='mx-2 w-50'>How often do you use technological devices?</div>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="Tech"
                                                value={formData.Tech}
                                                onChange={handleInputChange}
                                            >
                                                <FormControlLabel value="1" control={<Radio />} label="Frequently" />
                                                <FormControlLabel value="2" control={<Radio />} label="Sometimes" />
                                                <FormControlLabel value="0" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        </div>

                                        <div style={{ height: '8%' }} className='d-flex justify-content-start align-items-center'>
                                            <div className='mx-2 w-50'>How often do you drink alcohol?</div>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="Alco"
                                                value={formData.Alco}
                                                onChange={handleInputChange}
                                            >
                                                <FormControlLabel value="1" control={<Radio />} label="Frequently" />
                                                <FormControlLabel value="2" control={<Radio />} label="Sometimes" />
                                                <FormControlLabel value="0" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        </div>

                                        <div style={{ height: '8%' }} className=' d-flex justify-content-start align-items-center'>
                                            <div className='mx-2 w-50'>Do you eat any food between meals?</div>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="FBMeals"
                                                value={formData.FBMeals}
                                                onChange={handleInputChange}
                                            >
                                                <FormControlLabel value="1" control={<Radio />} label="Frequently" />
                                                <FormControlLabel value="2" control={<Radio />} label="Sometimes" />
                                                <FormControlLabel value="0" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        </div>


                                        <div className='d-flex align-items-center mt-4'>
                                            <div className='my-3 w-50 d-flex flex-column justify-content-start align-items-center'>
                                                <div className='mx-2'>How many main meals do you have daily?</div>
                                                <Select
                                                    className='mx-2 mt-2'
                                                    labelId="meal-select-label"
                                                    id="meal-select"
                                                    value={formData.Nmeals}
                                                    onChange={handleInputChange}
                                                    name="Nmeals"
                                                    style={{ width: '150px' }}
                                                >
                                                    <MenuItem value={1}>1</MenuItem>
                                                    <MenuItem value={2}>2</MenuItem>
                                                    <MenuItem value={3}>3</MenuItem>
                                                    <MenuItem value={4}>4</MenuItem>
                                                </Select>
                                            </div>


                                            <div className=' d-flex flex-column justify-content-start align-items-center'>
                                                <div className='mx-2'>Which transportation do you usually use?</div>
                                                <Select
                                                    className='mx-2 mt-2'
                                                    labelId="meal-select-label"
                                                    id="transport-select"
                                                    value={formData.Transport}
                                                    onChange={handleInputChange}
                                                    name="Transport"
                                                    style={{ width: '150px' }}
                                                >
                                                    <MenuItem value={0}>Automobile</MenuItem>
                                                    <MenuItem value={1}>Bike</MenuItem>
                                                    <MenuItem value={1}>Motorbike</MenuItem>
                                                    <MenuItem value={3}>Public Transport</MenuItem>
                                                    <MenuItem value={4}>Walking</MenuItem>
                                                </Select>
                                            </div>

                                        </div>

                                        <div className='d-flex align-items-center mt-2 mb-2'>
                                            <div className='w-50 my-2 d-flex flex-column justify-content-start align-items-center' >
                                                <div className='mx-2'>Do you usually eat vegetables in your meals?</div>
                                                <Slider
                                                    className='m-0 mx-3'
                                                    aria-label="VegMeals"
                                                    defaultValue={1}
                                                    getAriaValueText={valuetext}
                                                    valueLabelDisplay="auto"
                                                    step={1}
                                                    marks={markers}
                                                    min={1}
                                                    max={3}
                                                    value={formData.VegMeals}
                                                    name="VegMeals"
                                                    onChange={handleInputChange}
                                                    style={{ width: '200px', height: '2px' }}
                                                />
                                            </div>

                                            <div className='my-2 d-flex flex-column justify-content-start align-items-center'>
                                                <div className='mx-2'>How much water do you drink daily in litres?</div>
                                                <Slider
                                                    className='m-0 mx-3'
                                                    aria-label="H20"
                                                    defaultValue={1}
                                                    getAriaValueText={valuetext}
                                                    valueLabelDisplay="auto"
                                                    step={1}
                                                    marks={markers}
                                                    min={1}
                                                    max={3}
                                                    value={formData.H20}
                                                    name="H20"
                                                    onChange={handleInputChange}
                                                    style={{ width: '200px', height: '2px' }}
                                                />
                                            </div>

                                        </div>






                                        <div className='mt-5 p-3 rounded shadow d-flex justify-content-start align-items-center' >
                                            <div className='mx-2 w-50'>How often do you have physical activity?</div>
                                            <Rating
                                                size="large"
                                                style={{}}
                                                name="Pactivity"
                                                value={formData.Pactivity}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                    setFormData({
                                                        ...formData,
                                                        ['Pactivity']: newValue,
                                                    });

                                                }}

                                            />
                                        </div>
                                    </div>
                                }
                                {
                                    activeStep == 1 &&
                                    <div className='m-5 mb-0'>


                                        {data == 6 &&
                                            <div>
                                                <Alert variant="filled" severity="error" style={{ width: "100%", fontSize: '1.2rem', padding: '15px' }}>
                                                    <AlertTitle>WARNING</AlertTitle>
                                                    YOU ARE UNDER OVERWEIGHT LEVEL-II CATEGORY!!!!!
                                                </Alert>

                                            </div>
                                        }

                                        {data == 4 &&
                                            <div>
                                                <Alert variant="filled" severity="error" style={{ width: "100%", fontSize: '1.2rem', padding: '15px' }}>
                                                    <AlertTitle>WARNING</AlertTitle>
                                                    YOU ARE UNDER OBESITY TYPE-III CATEGORY!!!!!
                                                </Alert>

                                            </div>
                                        }
                                        
                                        {data == 3 &&
                                            <div>
                                                <Alert variant="filled" severity="error" style={{ width: "100%", fontSize: '1.2rem', padding: '15px' }}>
                                                    <AlertTitle>WARNING</AlertTitle>
                                                    YOU ARE UNDER OBESITY TYPE-II CATEGORY!!!!!
                                                </Alert>

                                            </div>
                                        }
                                        
                                        {data == 2 &&
                                            <div>
                                                <Alert variant="filled" severity="error" style={{ width: "100%", fontSize: '1.2rem', padding: '15px' }}>
                                                    <AlertTitle>WARNING</AlertTitle>
                                                    YOU ARE UNDER OBESITY TYPE-I CATEGORY!!!!!
                                                </Alert>

                                            </div>
                                        }
                                        
                                            {data == 5 &&
                                                <div>
                                                    <Alert variant="filled" severity="warning" style={{ width: "100%", fontSize: '1.2rem', padding: '15px', backgroundColor: 'yellow' }}>
                                                        <AlertTitle>WARNING</AlertTitle>
                                                        YOU HAVE HIGH CHANCES OF GETTING OBESITY!!!!!
                                                    </Alert>

                                                </div>
                                            }
                                        
                                        {data == 0 &&
                                            <div>
                                                <Alert variant="filled" severity="warning" style={{ width: "100%", fontSize: '1.2rem', padding: '15px' }}>
                                                    <AlertTitle>WARNING</AlertTitle>
                                                    YOU ARE CONSIDERED AS UNDER WEIGHT CATEGORY!!!!!
                                                </Alert>

                                            </div>
                                        }

                                        {data == 1 &&
                                            <Alert variant="filled" severity="success" style={{ width: "100%", fontSize: '1.2rem', padding: '15px' }}>
                                                <AlertTitle>CONGRATS</AlertTitle>
                                                YOU ARE UNDER NORMAL WEIGHT CATEGORY!!!!!
                                            </Alert>
                                        }


                                        <div className='text-center h5 mt-2'>RECOMMENDATIONS</div>
                                        <hr></hr>
                                        <div>
                                            {formData['GenHlth'] <= 3 ?
                                                <Alert severity="warning">
                                                    To avoid obesity, it's crucial to prioritize overall health. Consider maintaining your general well-being as a key factor.
                                                </Alert>
                                                :
                                                <Alert severity='success'>
                                                    Kudos for prioritizing and maintaining overall health and well-being.
                                                </Alert>

                                            }
                                            {
                                                parseInt(formData['BMI']) - 28 > parseInt(formData['BMI']) - 31 ?
                                                    <Alert severity="warning">
                                                        Average BMI of Non-obese Patients are 28 and obesity are 31.
                                                        You have a BMI of {formData['BMI']}
                                                    </Alert>
                                                    :
                                                    <Alert severity='success'>
                                                        Average BMI of Non-obese are 28 and you have BMI of {formData['BMI']}
                                                    </Alert>
                                            }

                                            {formData['Age'] >= 7 &&
                                                <Alert severity="warning">
                                                    Certainly! Age can be a significant factor, and individuals who reach the age of 50 may face an increased likelihood of developing obesity.
                                                </Alert>
                                            }

                                            {formData['CholCheck'] == true ?
                                                <Alert severity="warning">
                                                    High cholesterol is linked to an increased risk of obesity, according to data. Control cholesterol through a healthy lifestyle for overall well-being and lower risk. Consult with a healthcare professional for personalized advice.
                                                </Alert>
                                                :
                                                <Alert severity="success">
                                                    Safeguard against obesity by keeping cholesterol in check. Your levels are already safe, maintain a healthy lifestyle for ongoing protection. Consult with a healthcare professional for personalized guidance.
                                                </Alert>


                                            }

                                            {formData['HighBP'] == true ?
                                                <Alert severity="warning">
                                                    High blood pressure is linked to an increased obesity risk. Control it through a healthy lifestyle for overall well-being. Consult a healthcare professional for personalized advice.
                                                </Alert>
                                                :
                                                <Alert severity='success'>
                                                    Maintaining a healthy lifestyle is crucial in mitigating the risk of obesity associated with high blood pressure. Prioritize overall well-being by adopting healthy habits. For personalized guidance, consult a healthcare professional.
                                                </Alert>
                                            }

                                            {formData['PhysActivioty'] == 0 ?
                                                <Alert severity="warning">
                                                    Regular physical activity helps prevent obesity, so prioritize exercise for better health.
                                                </Alert>
                                                :
                                                <Alert severity='success'>
                                                    It's good your maintaining physical activity.. By lowering the risk of problems, regulating blood sugar levels, and enhancing insulin sensitivity, maintaining excellent physical fitness benefits people with obesity.
                                                </Alert>
                                            }

                                            {
                                                formData['Fruits'] == false || formData['Veggies'] == true ?
                                                    <Alert severity="warning">
                                                        Include a variety of vegetables and fruits in your diet to help prevent obesity and promote overall health through their rich fiber, vitamins, and antioxidants.
                                                    </Alert>
                                                    :
                                                    <Alert severity='success'>
                                                        Congratulations on consistently choosing a diet rich in fruits and vegetables to help prevent obesity and promote overall health!
                                                    </Alert>
                                            }

                                            {
                                                formData['smoker'] == true || formData['HvyAlcoholComsump' == true] ?
                                                    <Alert severity="warning">
                                                        Smoking and alcohol use increase the risks of obesity patients by causing insulin resistance and blood sugar fluctuations, which exceed any possible cardiovascular advantages.
                                                    </Alert> :
                                                    <Alert severity='success'>
                                                        Welldone on maintaining a healthy lifestyle by abstaining from smoking and drinking! it prevents obesity!!
                                                    </Alert>
                                            }
                                        </div>
                                        <button className='mt-3 btn btn-primary mx-4' onClick={() => setPage(2)} style={{ float: 'right', width: "140px" }}> Analytics</button>
                                    </div>
                                }


                                {
                                    activeStep == 0 &&
                                    <div className='d-flex justify-content-end'>
                                        <button className='btn btn-primary' style={{ width: "15%" }} onClick={(e) => {
                                            handleNext()
                                            sendDataToBackend(e)
                                        }}>
                                            SUBMIT
                                        </button>
                                    </div>

                                }


                            </form>

                        </div>
                    }
                </div>
            }

            {
                page == 2 &&
                <div>
                    <div className='w-75 mx-auto'>
                        <div className='d-flex justify-content-start'>
                            <div className='' style={{ marginLeft: "0px" }}>

                                <button className='btn btn-sm btn-danger m-0 mt-2 mx-3 d-flex justify-content-center align-items-center' onClick={() => handleHome()} style={{ width: "95px", height: "35px" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                                    </svg>
                                    <div className='mx-1'> Home</div>
                                </button>
                            </div>
                            <h4 className="text-center myfont" style={{ marginLeft: "150px" }}>OBESITY PREDICTION SYSTEM</h4>
                        </div>

                        <hr className='m-3'></hr>
                    </div>

                    <Viz />
                </div>

            }


        </div >
    );
}

export default App;


