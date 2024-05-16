import { IconEdit } from "@douyinfe/semi-icons";
import { Nav } from "@douyinfe/semi-ui";

const items = [
  {
    itemKey: "approve-management",
    text: "文章管理",
    icon: <IconEdit />,
    items: [
      {
        itemKey: "editArticle",
        text: "写文章",
      },
      {
        itemKey: "managerArticle",
        text: "所有文章",
      },
    ],
  },
];

const NavV = () => {

  return (
    <Nav
    defaultIsCollapsed={true}
      className="nava"
      bodyStyle={{ height: "100%" }}
      items={items}
      onSelect={(key) => console.log(key)}
      footer={{
        collapseButton: true,
      }}
    />
  );
};

export default NavV;
