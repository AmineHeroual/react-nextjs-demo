import React from 'react';
import classes from './MeetupDetail.module.css';

const MeetupDetail = (props) => {
    return (
        <section className={classes.detail}>
            <img src={props.image} alt={props.title} />
            <div>
                <h1>{props.title}</h1>
                <h2>{props.address}</h2>
                <p>{props.description}</p>
            </div>
        </section>
    );
};

export default MeetupDetail;
