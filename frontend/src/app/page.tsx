"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";
import "./page.css";
import CardSection from "@/components/cardSection/CardSection";
import ActionBar from "@/components/actionBar/ActionBar";
import TaskSection from "@/components/taskSection/TaskSection";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { resetError } from "@/redux/auth/action";
import { useDispatch } from "react-redux";

const Home: React.FC = () => {
  const { token, loading } = useSelector((store: RootState) => store.auth);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<{
    priority?: string;
    deadline?: string;
  }>({});
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      router.push("/login");
      dispatch(resetError());
    }
  }, [token]);

  return (
    <div className="task">
      {loading ? (
        <div className="loader">
          <Spin size="large" />
        </div>
      ) : (
        ""
      )}
      <div className="taskCompOne">
        <Sidebar />
      </div>
      <div className="taskCompTwo">
        <div className="scrollableContent">
          <Header />
          <CardSection />
          <ActionBar setSearchQuery={setSearchQuery} setFilter={setFilter} />
          <TaskSection searchQuery={searchQuery} filter={filter} />
        </div>
      </div>
    </div>
  );
};

export default Home;
