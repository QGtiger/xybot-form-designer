import { createFromIconfontCN } from "@ant-design/icons";
import { DatePicker, Input, InputNumber, Select } from "antd";
import { create } from "zustand";
import { FormItemHoc, MaterialWrapperHoc } from "./utils";

interface MaterialState {
  materialList: MaterialItem[];
  materialMap: Record<MaterialItem["code"], MaterialItem>;
  materialKeys: MaterialItem["code"][];
}

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4921468_eujnbj40fki.js",
});

export const useMaterialStore = create<MaterialState>(() => {
  const MaterialInput = FormItemHoc(Input);
  const MaterialInputNumber = FormItemHoc((props: any) => {
    return <InputNumber {...props} style={{ width: "100%" }} />;
  });
  const MaterialSelect = FormItemHoc(Select);
  const MaterialMultiSelect = FormItemHoc((props: any) => {
    return <Select {...props} mode="multiple" style={{ width: "100%" }} />;
  });
  const MaterialDatePicker = FormItemHoc((props: any) => {
    return <DatePicker {...props} style={{ width: "100%" }} />;
  });

  const defaultProps = {
    placeholder: "请输入",
  };

  const materialList: MaterialItem[] = [
    {
      code: "input",
      name: "输入框",
      desc: "输入框组件",
      icon: <IconFont type="icon-biaodanzujian-shurukuang" />,
      defaultProps,
      dev: MaterialWrapperHoc(MaterialInput),
      prod: MaterialInput,
    },
    {
      code: "inputNumber",
      name: "数字输入",
      desc: "数字输入框组件",
      icon: <IconFont type="icon-fuhao-shuzishurukuang" />,
      dev: MaterialWrapperHoc(MaterialInputNumber),
      prod: MaterialInputNumber,
      defaultProps,
    },
    {
      code: "select",
      name: "下拉选择",
      desc: "单选下拉",
      icon: <IconFont type="icon-danxuanxiala" />,
      dev: MaterialWrapperHoc(MaterialSelect),
      prod: MaterialSelect,
      defaultProps,
    },
    {
      code: "multiSelect",
      name: "下拉多选",
      desc: "多选下拉",
      icon: <IconFont type="icon-duoxuanxiala" />,
      defaultProps,
      dev: MaterialWrapperHoc(MaterialMultiSelect),
      prod: MaterialMultiSelect,
    },
    // {
    //   code: "upload",
    //   name: "文件上传",
    //   desc: "文件上传组件",
    //   icon: <IconFont type="icon-wenjianshangchuan" />,
    //   dev: () => <div>Checkbox Component</div>,
    // },
    {
      code: "datePicker",
      name: "日期选择",
      desc: "日期选择组件",
      icon: <IconFont type="icon-riqixuanze" />,
      defaultProps,
      dev: MaterialWrapperHoc(MaterialDatePicker),
      prod: MaterialDatePicker,
    },
  ];

  return {
    materialList,
    materialMap: materialList.reduce((acc, curr) => {
      acc[curr.code] = curr;
      return acc;
    }, {} as MaterialState["materialMap"]),
    materialKeys: materialList.map((item) => item.code),
  };
});

export function useMaterialList() {
  const { materialList } = useMaterialStore();
  return materialList;
}

export function useMaterialMap() {
  const { materialMap } = useMaterialStore();
  return materialMap;
}
