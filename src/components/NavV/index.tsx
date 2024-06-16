import { IconEdit } from "@douyinfe/semi-icons";
import { Nav } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";

const items = [
  {
    itemKey: "approve-management",
    text: "文章管理",
    icon: <IconEdit />,
    items: [
      {
        itemKey: "/console/article/editor",
        text: "写文章",
      },
      {
        itemKey: "/console/article/manage",
        text: "所有文章",
      },
    ],
  },
];

const NavV = () => {
  //路由跳转
  const navigate = useNavigate();

  return (
    <Nav
      defaultIsCollapsed={true}
      className="nava"
      bodyStyle={{ height: "100%" }}
      items={items}
      onSelect={(key) => navigate(key.itemKey.toString())}
      footer={{
        collapseButton: true,
      }}
    />
  );
};

export default NavV;
