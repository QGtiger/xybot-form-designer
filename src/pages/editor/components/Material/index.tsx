import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Segmented } from "antd";
import { useState } from "react";
import MaterialList from "./MaterialList";

export default function Material() {
  const [activeKey, setActionKey] = useState<"list" | "tree">("list");
  return (
    <div className="p-4 flex flex-col gap-4 h-full">
      <Segmented
        value={activeKey}
        options={[
          { label: "组件", value: "list", icon: <BarsOutlined /> },
          { label: "大纲树", value: "tree", icon: <AppstoreOutlined /> },
        ]}
        onChange={setActionKey}
        block
      />
      <div>
        <MaterialList />
      </div>
    </div>
  );
}
