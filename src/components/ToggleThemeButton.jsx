import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button } from "antd";

// eslint-disable-next-line react/prop-types
const ToggleThemeButton = ({ darkTheme, toggleTheme }) => {
    return (
        <div className="toggle-theme-btn">
            <Button onClick={toggleTheme}>
                {darkTheme ? <SunOutlined /> : <MoonOutlined />}
                <span>{darkTheme ? "Light" : "Dark"}</span>
            </Button>
        </div>
    )
}

export default ToggleThemeButton;