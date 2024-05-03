// src/Home.js
import React from 'react';

const Home = ({ setPage, setInputType }) => {
    return (
        <div className="container w-50 mt-5 myshadow p-4" style={{ height: '60vh' }}>
            <h4 className="mb-4 text-center myfont">OBESITY PREDICTION SYSTEM</h4>
            <hr></hr>

            <div className="d-flex justify-content-center align-items-center">
                <button style={{ height: '130px', width: '180px' }} onClick={() => {
                    setPage(1)
                    setInputType(1)
                }} className="btn bg-pink text-white bg-gradient btn-lg btn-block m-4">INPUT</button>
               
                <button onClick={() => setPage(2)} style={{ height: '130px', width: '180px' }} className="btn bg-pink text-white bg-gradient btn-lg btn-block m-4">ANALYTICS</button>
            </div>
        </div>
    );
};

export default Home;
