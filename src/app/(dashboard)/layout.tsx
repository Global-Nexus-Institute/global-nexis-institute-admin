"use client";
import { RouteLoader } from "@/components/route-loader/RouteLoader";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Layout, Menu, Image } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
          <div className="flex h-20 items-center sticky top-0">
            <Image src="/images/logo.png" alt="logo" height={50} width={50} />
          </div>
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
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "white",
            }}
          >
            <div
              className="logo flex justify-center bg-white cursor-pointer "
              onClick={() => router.push("/")}
            >
              <Image
                src="/images/logo.png"
                alt="logo"
                height={80}
                width={80}
                preview={false}
              />
            </div>
            <Menu
              theme="light"
              mode="horizontal"
              className="text-white"
              items={menuItems}
            />
            <div>
              <Avatar
                size={50}
                style={{ color: "#87d068" }}
                icon={<FontAwesomeIcon icon={faUser} />}
              />
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
