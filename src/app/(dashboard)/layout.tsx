"use client";
import { RouteLoader } from "@/components/route-loader/RouteLoader";
import { resetAuthState } from "@/lib/features/slices/auth.slice";
import { useAppSelector } from "@/lib/store/store.hooks";
import { useAuth } from "@/shared/hooks/auth/auth.hooks";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Layout, Menu, Image, MenuProps } from "antd";
import {
  AppstoreOutlined,
  HomeFilled,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";

const { Header, Content, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  position: "fixed",
  height: "100vh",
  width: "20%",
  marginTop: "5%",
  color: "white",
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
    label: <Link href="/staff">Manage Staff</Link>,
  },
  {
    key: "3",
    label: <Link href="/courses">Manage Courses</Link>,
  },
];

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

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);
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
    <>
      <RouteLoader />
      <Layout style={{ backgroundColor: "#19173C", height: "100%" }}>
        <Sider
          className="bg-gray-800"
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={siderStyle}
        >
          <Menu
            theme="dark"
            items={menuItems}
            style={{ color: "white" }}
            mode="inline"
            className="text-white"
          />
        </Sider>
        <Layout style={{ backgroundColor: "#19173C" }}>
          <Header
            className="shadow-md px-4 z-[100] sticky top-0"
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#19173C",
            }}
          >
            {/* <div className="flex h-20 bg-gndarkblue"> */}
            <div
              className="flex rounded-full basis-1/5  m-3 cursor-pointer"
              onClick={() => router.push("/")}
            >
              <Image
                src="/images/logo.png"
                preview={false}
                height={50}
                className="bg-white"
              />
            </div>
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
            {/* </div> */}
          </Header>
          <Content className="m-4 h-full p-6 bg-gndarkblue shadow-md rounded-md ml-[15%]">
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
