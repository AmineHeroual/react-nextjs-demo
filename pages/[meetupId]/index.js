import React, { Fragment } from 'react';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '@/components/meetups/MeetupDetail';
import Head from 'next/head';

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        'mongodb+srv://amine25000hamza:KniJtA6SiPausUn@cluster0.prib8nc.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: false,
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() },
        })),
    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect(
        'mongodb+srv://amine25000hamza:KniJtA6SiPausUn@cluster0.prib8nc.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectMeetups = await meetupsCollection.findOne({
        _id: new ObjectId(meetupId),
    });
    client.close();

    return {
        props: {
            meetupData: {
                id: selectMeetups._id.toString(),
                title: selectMeetups.title,
                address: selectMeetups.address,
                image: selectMeetups.image,
                description: selectMeetups.description,
            },
        },
    };
}

const MeetupDetails = (props) => {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta
                    name="description"
                    content={props.meetupData.description}
                ></meta>
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>
    );
};

export default MeetupDetails;
