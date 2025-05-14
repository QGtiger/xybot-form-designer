import { createFromIconfontCN } from "@ant-design/icons";
import { create } from "zustand";

interface MaterialItem {
  code: string;
  name: string;
  desc: string;
  dev: React.FC;
  icon?: React.ReactNode;
}

interface MaterialState {
  materialList: MaterialItem[];
}

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4921468_eujnbj40fki.js",
});

export const useMaterialStore = create<MaterialState>(() => {
  const materialList: MaterialItem[] = [
    {
      code: "input",
      name: "输入框",
      desc: "输入框组件",
      icon: <IconFont type="icon-biaodanzujian-shurukuang" />,
      dev: () => <div>Input Component</div>,
    },
    {
      code: "inputNumber",
      name: "数字输入",
      desc: "数字输入框组件",
      icon: <IconFont type="icon-fuhao-shuzishurukuang" />,
      dev: () => <div>Select Component</div>,
    },
    {
      code: "select",
      name: "下拉选择",
      desc: "单选下拉",
      icon: <IconFont type="icon-danxuanxiala" />,
      dev: () => <div>Checkbox Component</div>,
    },
    {
      code: "multiSelect",
      name: "下拉多选",
      desc: "多选下拉",
      icon: <IconFont type="icon-duoxuanxiala" />,
      dev: () => <div>Checkbox Component</div>,
    },
    {
      code: "upload",
      name: "文件上传",
      desc: "文件上传组件",
      icon: <IconFont type="icon-wenjianshangchuan" />,
      dev: () => <div>Checkbox Component</div>,
    },
    {
      code: "datePicker",
      name: "日期选择",
      desc: "日期选择组件",
      icon: <IconFont type="icon-riqixuanze" />,
      dev: () => <div>Checkbox Component</div>,
    },
  ];

  return {
    materialList,
  };
});

export function useMaterialList() {
  const { materialList } = useMaterialStore();
  return materialList;
}
