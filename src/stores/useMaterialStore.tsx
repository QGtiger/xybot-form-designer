import {
  BankOutlined,
  createFromIconfontCN,
  FormOutlined,
  NumberOutlined,
  SelectOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { DatePicker, Input, InputNumber } from "antd";
import { create } from "zustand";
import { FormItemHoc, FormItemLabelHoc, MaterialWrapperHoc } from "./utils";
import Title from "./materials/title";
import SubTitle from "./materials/subtitle";
import Submit from "./materials/submit";
import Banner from "./materials/banner";
import MutliSelect from "./materials/multiSelect";
import CustomSelect from "./materials/select";
import { defaultInputSetter } from "./utils/constant";
import CustomForm from "./materials/form";

interface MaterialState {
  materialList: MaterialItem[];
  materialMap: Record<MaterialItem["code"], MaterialItem>;
  materialKeys: MaterialItem["code"][];

  getMaterialItemByCode: (code: MaterialItem["code"]) => MaterialItem;
}

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4921468_i9tqszect6l.js",
});

export const useMaterialStore = create<MaterialState>(() => {
  const MaterialInput = FormItemHoc(FormItemLabelHoc(Input));
  const MaterialInputNumber = FormItemHoc(
    FormItemLabelHoc((props: any) => {
      return <InputNumber {...props} style={{ width: "100%" }} />;
    })
  );
  const MaterialSelect = FormItemHoc(FormItemLabelHoc(CustomSelect));
  const MaterialMultiSelect = FormItemHoc(FormItemLabelHoc(MutliSelect));
  const MaterialDatePicker = FormItemHoc(
    FormItemLabelHoc((props: any) => {
      return <DatePicker {...props} style={{ width: "100%" }} />;
    })
  );

  const defaultProps = {
    placeholder: "请输入",
  };

  const materialList: MaterialItem[] = [
    {
      code: "form",
      name: "表单容器",
      desc: "表单容器组件",
      icon: <FormOutlined />,
      hidden: true,
      dev: MaterialWrapperHoc(CustomForm),
      prod: CustomForm,
    },
    {
      code: "banner",
      name: "Banner",
      desc: "Banner 组件",
      icon: <BankOutlined />,
      hidden: true,
      defaultProps: {
        background:
          "https://winrobot-pub-a-1302949341.cos.ap-shanghai.myqcloud.com/image/20250514202954/395c74ad8b4de6e1b7a38247700842aa.png",
      },
      dev: MaterialWrapperHoc(Banner),
      prod: Banner,
      configSetter: [
        {
          type: "bgselector",
          name: "background",
          label: "背景外观",
        },
      ],
    },
    {
      code: "title",
      name: "标题",
      desc: "表单标题",
      icon: <IconFont type="icon-login_title" />,
      hidden: true,
      defaultProps: {
        text: "表单标题",
      },
      configSetter: [
        {
          type: "input",
          name: "text",
          label: "标题文案",
        },
      ],
      dev: MaterialWrapperHoc(Title),
      prod: Title,
    },
    {
      code: "subtitle",
      name: "副标题",
      desc: "表单副标题",
      icon: <IconFont type="icon-subtitle" />,
      hidden: true,
      defaultProps: {
        text: "表单副标题",
      },
      configSetter: [
        {
          type: "ricktext",
          name: "text",
          label: "副标题文案",
        },
      ],
      dev: MaterialWrapperHoc(SubTitle),
      prod: SubTitle,
    },
    {
      code: "submit",
      name: "提交按钮",
      desc: "表单提交按钮",
      icon: <CloudUploadOutlined />,
      hidden: true,
      defaultProps: {
        text: "提交",
      },
      configSetter: [
        {
          type: "input",
          name: "text",
          label: "按钮文案",
        },
      ],
      dev: MaterialWrapperHoc(Submit),
      prod: Submit,
    },
    {
      code: "input",
      name: "输入框",
      desc: "输入框组件",
      icon: <IconFont type="icon-biaodanzujian-shurukuang" />,
      defaultProps,
      configSetter: [
        ...defaultInputSetter,
        {
          type: "input",
          name: "defaultValue",
          label: "默认文案",
        },
      ],
      dev: MaterialWrapperHoc(MaterialInput),
      prod: MaterialInput,
    },
    {
      code: "inputNumber",
      name: "数字输入",
      desc: "数字输入框组件",
      icon: <NumberOutlined />,
      dev: MaterialWrapperHoc(MaterialInputNumber),
      prod: MaterialInputNumber,
      defaultProps,
      configSetter: [
        ...defaultInputSetter,
        {
          type: "inputnumber",
          name: "defaultValue",
          label: "默认值",
        },
      ],
    },
    {
      code: "select",
      name: "下拉选择",
      desc: "单选下拉",
      icon: <SelectOutlined />,
      dev: MaterialWrapperHoc(MaterialSelect),
      prod: MaterialSelect,
      defaultProps,
      configSetter: [
        ...defaultInputSetter,
        {
          type: "optionseditor",
          name: "options",
          label: "下拉选项",
        },
        {
          type: "input",
          name: "defaultValue",
          label: "默认值",
        },
      ],
    },
    {
      code: "multiSelect",
      name: "下拉多选",
      desc: "多选下拉",
      icon: <IconFont type="icon-duoxuanxiala" />,
      defaultProps,
      dev: MaterialWrapperHoc(MaterialMultiSelect),
      prod: MaterialMultiSelect,
      configSetter: [
        ...defaultInputSetter,
        {
          type: "optionseditor",
          name: "options",
          label: "下拉选项",
        },
      ],
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
      configSetter: [...defaultInputSetter],
    },
  ];

  const materialMap = materialList.reduce((acc, curr) => {
    acc[curr.code] = curr;
    return acc;
  }, {} as MaterialState["materialMap"]);
  return {
    materialList,
    materialMap,
    materialKeys: materialList.map((item) => item.code),

    getMaterialItemByCode: (code) => {
      return materialMap[code];
    },
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
