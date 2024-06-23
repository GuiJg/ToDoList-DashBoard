import { Menu } from "antd";
import { HomeOutlined, CalendarOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const MenuList = ({ darkTheme }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleMenuItemClick = (path) => {
        navigate(path);
    }

    return (
        <Menu
            theme={darkTheme ? "dark" : "light"}
            mode="inline" className="menu-bar"
            defaultSelectedKeys={[location.pathname]}
            onClick={({ key }) => handleMenuItemClick(key)}
        >
            <Menu.Item className="menu-item" key="/" icon={<HomeOutlined />}>
                <Link to="/" className="sidebar-link">Dashboard</Link>
            </Menu.Item>
            <Menu.Item className="menu-item" key="/listas" icon={<CalendarOutlined />}>
                <Link to="/listas">Listas</Link>
            </Menu.Item>
        </Menu>
    )
}

export default MenuList;

