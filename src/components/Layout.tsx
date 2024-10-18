import { Layout, Menu } from "antd";
import Link from "next/link";
import { ReactNode } from "react";

const { Header, Content, Sider } = Layout;

export default function DashboardLayout  ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)  {
  return (
    <Layout className="min-h-screen">
      <Sider className="bg-gray-800">
        <Menu theme="dark" mode="inline" className="text-white">
          <Menu.Item key="1">
            <Link href="/users">Manage Users</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/courses">Manage Courses</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="bg-white shadow-md px-4" />
        <Content className="m-4 p-6 bg-white shadow-md rounded-md">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

