import Layout from '@/components/layout/Layout';
import MainNavigation from '@/components/layout/MainNavigation';
import MeetupList from '@/components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';

// const data = [
//     {
//         id: 'm1',
//         title: 'A first meetup',
//         image: 'https://images.unsplash.com/photo-1682603812564-88b0a2896682?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
//         address: 'Some address 5, 12345 some city',
//         descirption: 'this is  an meetup for testing...',
//     },
//     {
//         id: 'm2',
//         title: 'A first meetup',
//         image: 'https://images.unsplash.com/photo-1682603812564-88b0a2896682?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
//         address: 'Some address 5, 12345 some city',
//         descirption: 'this is  an meetup for testing...',
//     },
// ];

const HomePage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta
                    name="description"
                    content="Browser a huge list of hight active React meetups! "
                ></meta>
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
};

// export async function getServerSideProps() {
//     // fetch data from an API

//     return {
//         props: {
//             meetups: data,
//         },
//     };
// }

export async function getStaticProps() {
    // fetch data from API;

    const client = await MongoClient.connect(
        'mongodb+srv://amine25000hamza:KniJtA6SiPausUn@cluster0.prib8nc.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },

        revalidate: 1,
    };
}

export default HomePage;
