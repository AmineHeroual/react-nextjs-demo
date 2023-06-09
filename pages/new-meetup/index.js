import React, { Fragment } from 'react';
import NewMeetupForm from '@/components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import Head from 'next/head';

const NewMeetupPage = () => {
    const router = useRouter();

    async function addMeetupHandler(enterdMeetupData) {
        const res = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enterdMeetupData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        console.log(data);

        router.push('/');
    }
    return (
        <Fragment>
            <Head>
                <title>Add New Meetups</title>
                <meta
                    name="description"
                    content="Browser a huge list of hight active React meetups! "
                ></meta>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    );
};

export default NewMeetupPage;
