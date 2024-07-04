import { IconBookmark, IconEdit, IconPriceTag } from "@douyinfe/semi-icons";
import { Nav } from "@douyinfe/semi-ui";
import { OnSelectedData } from "@douyinfe/semi-ui/lib/es/navigation";
import { ReactText, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  {
    itemKey: "/console/categories",
    text: "分类管理",
    icon: <IconBookmark />,
    items: [],
  },
  {
    itemKey: "/console/tags",
    text: "标签管理",
    icon: <IconPriceTag />,
    items: [],
  },

];

const NavV = () => {
  const location = useLocation();
  const [keys, setkeys] = useState<ReactText[]>([]);
  const navigate = useNavigate();

  const onSelect = (data: OnSelectedData) => {
    setkeys([...data.selectedKeys]);
    navigate(data.itemKey.toString());
  };

  useEffect(() => {
    setkeys([location.pathname]);
  }, [location]);

  return (
    <Nav
      defaultIsCollapsed={false}
      bodyStyle={{ height: "100%" }}
      items={items}
      selectedKeys={keys}
      onSelect={onSelect}
      footer={{
        collapseButton: true,
      }}
    />
  );
};

export default NavV;
