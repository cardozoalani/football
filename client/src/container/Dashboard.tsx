import React from 'react'
import { Grid } from '@mui/material'
import NavBar from '../components/Nav';

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <Grid container>
      <NavBar />
      {children}
    </Grid>
  );
};

export default Dashboard