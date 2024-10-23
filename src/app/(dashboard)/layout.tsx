"use client";
import { RouteLoader } from "@/components/route-loader/RouteLoader";
import { Avatar, Layout, Menu } from "antd";
import Link from "next/link";
import { useState } from "react";

const { Header, Content, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  position: "fixed",
  height: "100vh",
  width: "20%",
  insetInlineStart: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};

const menuItems = [
  {
    key: "1",
    label: <Link href="/users">Manage Users</Link>,
  },
  {
    key: "2",
    label: <Link href="/courses">Manage Courses</Link>,
  },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
    <RouteLoader />
      <Layout className="h-full">
        <Sider
          className="bg-gray-800"
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={siderStyle}
        >
          <div className="flex h-20 items-center sticky top-0">Some logo</div>
          <Menu
            items={menuItems}
            theme="dark"
            mode="inline"
            className="text-white"
          />
        </Sider>
        <Layout>
          <Header
            className="bg-white shadow-md px-4 z-[100] sticky top-0"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="logo">Logo</div>
            <Menu theme="dark" mode="horizontal" className="text-white" />
            <div>
              <Avatar />
            </div>
          </Header>
          <Content className="m-4 h-full p-6 bg-white shadow-md rounded-md ml-[15%]">
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
