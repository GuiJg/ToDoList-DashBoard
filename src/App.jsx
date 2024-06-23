import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Button, Layout } from "antd"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"

//pages 
import Home from "./pages/Home"
import List from "./pages/Lists"

import Logo from "./components/Logo"
import MenuList from "./components/MenuList"
import ToggleThemeButton from "./components/ToggleThemeButton"

const { Sider } = Layout

function App() {

    const [darkTheme, setDarkTheme] = useState(false)
    const [collaped, setCollaped] = useState(false)

    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
    }

    return (
        <>
            <Layout>
                <Sider collapsed={collaped} collapsible trigger={null} className="sidebar" theme={darkTheme ? "dark" : "light"}>
                    <Logo />
                    <MenuList darkTheme={darkTheme} />
                    <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
                </Sider>
                <Layout className="layout-main">
                    <Button
                        className="toggle"
                        onClick={() => setCollaped(!collaped)}
                        type="text"
                        icon={collaped ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                        } />
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/listas" element={<List />} />
                    </Routes>
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
                </Layout>
            </Layout>
        </>
    )
}

export default App
