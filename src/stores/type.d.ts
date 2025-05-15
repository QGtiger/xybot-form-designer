interface MaterialItem {
  code: string;
  name: string;
  desc: string;
  icon?: React.ReactNode;
  defaultProps?: Record<string, any>;

  dev: React.FC<MaterialItemProps>;
  prod: React.FC<MaterialItemProps>;
}

interface MaterialItemProps {
  id: string;
  code: string;
  [x: string]: any;
}
