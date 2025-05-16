interface Setter {
  type: string;
  name: string;
  label: string;
  componentProps?: Record<string, any>;
}

interface MaterialItem {
  code: string;
  name: string;
  desc: string;
  icon?: React.ReactNode;
  defaultProps?: Record<string, any>;
  hidden?: boolean;

  configSetter?: Setter[];

  dev: React.FC<MaterialItemProps<Record<string, any>>>;
  prod: React.FC<MaterialItemProps>;
}

type MaterialItemProps<T = any> = {
  id: string;
  code: string;
} & T;
