import React from 'react';
import BuddyInfo from '../components/dashboard/BuddyInfo';
// import GroupInfo from '../components/dashboard/GroupInfo';

const UserInfo = () => {
    const role = localStorage.getItem('role');
    return (
        <>
            {/* {role === 'buddy' ? <BuddyInfo /> : <GroupInfo />} */}
        </>
    );
};

export default UserInfo;