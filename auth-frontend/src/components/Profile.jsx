import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile/');
        setProfileData(res.data);
      } catch (err) {
        console.error('Failed to fetch profile');
      }
    };
    if (user) fetchProfile();
  }, [user]);

  if (!user) return <Typography>You must be logged in to view this page</Typography>;

  return (
    <Container>
      <Typography variant="h4">Profile</Typography>
      {profileData ? (
        <div>
          <Typography>Name: {profileData.name}</Typography>
          <Typography>Email: {profileData.email}</Typography>
        </div>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
}