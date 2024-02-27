"use client";

import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonthlycomputingData = [
  { day: "1 Feb", computing: 0, storage: 0 },
  { day: "2 Feb", computing: 3.97, storage: 4.4 },
  { day: "3 Feb", computing: 0, storage: 0 },
  { day: "4 Feb", computing: 0, storage: 0 },
  { day: "5 Feb", computing: 0, storage: 0 },
  { day: "6 Feb", computing: 3.1, storage: 0 },
  { day: "7 Feb", computing: 0, storage: 0 },
  { day: "8 Feb", computing: 5.27, storage: 2.34 },
  { day: "9 Feb", computing: 0, storage: 0 },
  { day: "10 Feb", computing: 0, storage: 0 },
  { day: "11 Feb", computing: 0, storage: 0 },
  { day: "12 Feb", computing: 0, storage: 0 },
  { day: "13 Feb", computing: 0, storage: 0 },
  { day: "14 Feb", computing: 0, storage: 0 },
  { day: "15 Feb", computing: 0, storage: 0 },
  { day: "16 Feb", computing: 0, storage: 0 },
  { day: "17 Feb", computing: 0, storage: 0 },
  { day: "18 Feb", computing: 0, storage: 0 },
  { day: "19 Feb", computing: 0, storage: 0 },
  { day: "20 Feb", computing: 0, storage: 0 },
  { day: "21 Feb", computing: 0, storage: 0 },
  { day: "22 Feb", computing: 0, storage: 0 },
  { day: "23 Feb", computing: 2.5, storage: 3.5 },
  { day: "24 Feb", computing: 0, storage: 0 },
];

const DashboardPage = () => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4} h="100%">
      <GridItem colSpan={1} bg="gray.100" p={5} borderRadius="md" h={350}>
        <h1>
          <strong>Monthly Usage</strong>
        </h1>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={MonthlycomputingData}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="computing" fill="#8884d8" />
            <Bar dataKey="storage" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </GridItem>
      <GridItem colSpan={1} bg="gray.100" p={5} borderRadius="md" h={350}>
        <h1>Dashboard 2</h1>
        <p>
          Welcome to the dashboard. You can navigate to different sections of
          the app using the sidebar.
        </p>
      </GridItem>
      <GridItem colSpan={1} bg="gray.100" p={5} borderRadius="md" h={400}>
        <h1>Dashboard 3</h1>
        <p>
          Welcome to the dashboard. You can navigate to different sections of
          the app using the sidebar.
        </p>
      </GridItem>
      <GridItem colSpan={1} bg="gray.100" p={5} borderRadius="md" h={400}>
        <h1>Dashboard 4</h1>
        <p>
          Welcome to the dashboard. You can navigate to different sections of
          the app using the sidebar.
        </p>
      </GridItem>
    </Grid>
  );
};
export default DashboardPage;
