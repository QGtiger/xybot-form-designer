import { createRoot } from "react-dom/client";
// import FormDesignerEditor from "./pages/editor";
import DndCard from "./pages/dndcard";
import FormDesignerEditor from "./pages/editor";
import { ConfigProvider } from "antd";
import { SortableListDemo } from "./pages/sortableList";
import { DndkitDemo } from "./pages/dndkitdemo";
import PreviewFormex from "./pages/PreviewFormex";

const defaultSchema: FormexSchema = {
  version: "1.0",
  formItems: [
    {
      id: "banner",
      code: "banner",
    },
    {
      id: "form",
      code: "form",
      children: [
        {
          id: "title",
          code: "title",
        },
        {
          id: "subtitle",
          code: "subtitle",
          props: {
            text: '表单副标题\n\n```js\nimport { useMaterialMap } from "@/stores/useMaterialStore";\nimport classNames from "classnames";\nimport React, { useRef } from "react";\n\nexport default function PreviewFormex({ schema }: { schema: FormexSchema }) {\n  const materialMap = useMaterialMap();\n  const { formItems } = schema;\n\n  const formexDomRef = useRef<HTMLDivElement>(null);\n\n  function renderComponents(components?: FormexItem[]): React.ReactNode {\n    if (!components) return null;\n    return components.map((it) => {\n      const { code, props, id } = it;\n      const martialItem = materialMap[code];\n      if (!martialItem) return;\n      const { prod: T } = martialItem;\n\n      return React.createElement(\n        T,\n        {\n          key: id,\n          id,\n          code,\n          ...martialItem.defaultProps,\n          ...props,\n        },\n        renderComponents(it.children)\n      );\n    });\n  }\n\n  // md:bg-gradient-to-b md:from-indigo-200 md:via-cyan-50 md:to-white\n\n  return (\n    <div className="edit-area relative w-full min-h-full bg-white   rounded-xl">\n      <div className={classNames("")} ref={formexDomRef}>\n        {renderComponents(formItems)}\n      </div>\n    </div>\n  );\n}\n\n```\n\nGood',
          },
        },
        {
          id: "input-1",
          code: "input",
          props: {
            name: "表单项标题",
            defaultValue: "qweqweqwe",
          },
        },
        {
          code: "inputNumber",
          id: "inputNumber-1747655595464",
          props: {
            placeholder: "请输入",
            defaultValue: 13123,
            name: "12312312",
          },
        },
        {
          code: "select",
          id: "select-1747655596325",
          props: {
            placeholder: "请输入",
            options: [
              {
                value: "选项1",
                label: "选项1",
              },
              {
                value: "选项2",
                label: "选项2",
              },
              {
                value: "选项3",
                label: "选项3",
              },
              {
                value: "选项4",
                label: "选项4",
              },
              {
                value: "选项5",
                label: "选项5",
              },
            ],
            defaultValue: "选项3",
          },
        },
        {
          code: "multiSelect",
          id: "multiSelect-1747655596725",
          props: {
            placeholder: "请输入",
            options: [
              {
                value: "选项1",
                label: "选项1",
              },
              {
                value: "选项2",
                label: "选项2",
              },
              {
                value: "选项3",
                label: "选项3",
              },
              {
                value: "选项4",
                label: "选项4",
              },
              {
                value: "选项5",
                label: "选项5",
              },
            ],
            name: "xiala",
          },
        },
        {
          code: "datePicker",
          id: "datePicker-1747655597093",
          props: {
            placeholder: "请输入",
            name: "222",
          },
        },
        {
          id: "submit",
          code: "submit",
        },
      ],
    },
  ],
};

createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={{ token: { colorPrimary: "#7f70f5" } }}>
    <FormDesignerEditor onChange={console.log} />
    {/* <PreviewFormex schema={defaultSchema} onFinish={console.log} /> */}
    {/* <SortableListDemo /> */}
    {/* <DndkitDemo /> */}
  </ConfigProvider>
);
