"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Avatar, Card, Col, Menu, Row, Spin, Statistic } from "antd";
import {
  AppstoreOutlined,
  HomeFilled,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import type { MenuProps } from "antd";
import ColumnChart from "@/components/charts/column-charts/ColumnChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { RootState } from "@/lib/store/store";
import { useAppSelector } from "@/lib/store/store.hooks";
import { useAuth } from "@/shared/hooks/auth/auth.hooks";
import { useDispatch } from "react-redux";
import { resetAuthState } from "@/lib/features/slices/auth.slice";
import { RouteLoader } from "@/components/route-loader/RouteLoader";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: (
      <Link href="/" className="text-white">
        Home
      </Link>
    ),
    key: "home",
    icon: <HomeFilled />,
  },
  {
    label: (
      <Link href="/courses" className="text-white">
        Courses
      </Link>
    ),
    key: "courses",
    icon: <AppstoreOutlined />,
  },
  {
    label: (
      <Link href="/users" className="text-white">
        Students
      </Link>
    ),
    key: "users",
    icon: <SettingOutlined />,
  },
];

export default function Home() {
  const { user, loading, error, successMesage } = useAppSelector(
    (store: RootState) => store.auth,
  );
  const { logOutUser, authStatus } = useAuth();

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      const timer = setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const [current, setCurrent] = useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const handLogOut = () => {
    logOutUser()
      .then(() => {
        dispatch(resetAuthState());
      })
      .finally(() => router.replace("/auth/login"));
  };

  return (
    <div className="h-[100%] w-full">
      <RouteLoader />
      <Spin spinning={loading} size={"large"} tip={"..Looading"}>
        <div className="flex h-20 bg-gndarkblue">
          <div className="flex rounded-full basis-1/5  m-3">Logo</div>
          <div className="flex basis-3/5 h-full bg-gndarkblue text-white">
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
              style={{
                backgroundColor: "transparent",
                color: "white",
                fontWeight: "bold",
              }}
              className="flex w-full items-center justify-center h-full bg-gndarkblue "
            />
          </div>

          <div className="flex justify-center items-center basis-1/5">
            {user && (
              <div className="flex gap-4">
                <Avatar size={40}>{user.names && user.names[0]}</Avatar>{" "}
                <div
                  onClick={handLogOut}
                  className="text-white text-lg cursor-pointer"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col bg-gradient-to-b from-gndarkblue to-gnpinkdark h-[80%] ">
          <div className="h-full flex ">
            <div className="flex flex-col pl-10 basis-1/2 justify-center items-center">
              <div>
                <Image
                  src="/images/logo.png"
                  width={300}
                  height={300}
                  alt="logo"
                />
              </div>
              <div className="flex gap-4 ">
                {user ? (
                  <div>
                    <h1 className="text-4xl font-bold mt-3 ">
                      Welcome {user.names}
                    </h1>
                  </div>
                ) : (
                  <div className="mt-3 border p-3 bg-blue-900 rounded-lg ">
                    <Link href="/auth/login">Login</Link>
                  </div>
                )}
              </div>
            </div>
            <div className="p-3 basis-1/2 h-[80%] space-y-4">
              <Row gutter={6}>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="Active Students"
                      value={1123}
                      valueRender={(value) => (
                        <Link href="/users">{value}</Link>
                      )}
                      prefix={<FontAwesomeIcon icon={faUsers} />}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="Available Courses"
                      value={1123}
                      valueRender={(value) => (
                        <Link href="/courses">{value}</Link>
                      )}
                      prefix={<FontAwesomeIcon icon={faBook} />}
                    />
                  </Card>
                </Col>
              </Row>
              <Row gutter={6}>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="Active Instructors"
                      value={1123}
                      prefix={<FontAwesomeIcon icon={faUsers} />}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="Available Lessons"
                      value={1123}
                      prefix={<FontAwesomeIcon icon={faBook} />}
                    />
                  </Card>
                </Col>
              </Row>
              <br />
              <div className="h-auto bg-white">
                <ColumnChart />
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
}
