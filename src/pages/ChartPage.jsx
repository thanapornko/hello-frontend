import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { ContentBox } from "../styles/styledElements";
import Layout from "../layouts/Layout";
import * as adminApi from "../apis/adminApi";

export default function ChartPage() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchAllRecord = async () => {
      const res = await adminApi.getUserAvgRecord();
      setContent(res.data?.record);
      //   console.log(content, "---content---");
    };
    fetchAllRecord();
  }, []);

  return (
    <Layout>
      <ContentBox>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart width={500} height={400} data={content}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="User.firstName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgWeight" fill="#6a67a3" />
            <Bar dataKey="avgHeight" fill="#729a81" />
            <Bar dataKey="avgWaist" fill="#795b1f" />
          </BarChart>
        </ResponsiveContainer>
      </ContentBox>
    </Layout>
  );
}
