// src/Home.js
import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const Viz = ({ setPage, setInputType, handleHome }) => {

    const itemData = [
        {
            img: 'pic1.jpeg',
            title: 'HEATMAP (CORRELATION)',
            author : ""
        },
        {
            img: 'pic2.jpeg',
            title: 'Bar Plot (Correlation with Diabetes)',
            author : ""
        },
        {
            img: 'pic3.jpeg',
            title: 'Pair plot',
            author : ""


        },
        {
            img: 'pic4.jpeg',
            title: 'Scatter Plot b/n BMI, BP and General health',
            author : ""
        },
        {
            img: 'pic5.jpeg',
            title: 'Density Plot',
            author : ""
        }

    ];

    return (
        <div className="container mt-3 w-75 myshadow p-4 bg-form" style={{ height: '230vh' }}>            
            <ImageList >
                {itemData.map((item) => (
                    <ImageListItem key={item.img} style={{margin:"5px"}} className='border p-3 shadow'>
                        <img
                            srcSet={`${item.img}?w=220&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=220&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.title}
                            subtitle={<span>by: {item.author}</span>}
                            position="below"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
};

export default Viz;




