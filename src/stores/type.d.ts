interface MaterialItem {
  code: string;
  name: string;
  desc: string;
  dev: React.FC<MaterialItemProps>;
  icon?: React.ReactNode;
  defaultProps?: Record<string, any>;
}

interface MaterialItemProps {
  id: string;
  [x: string]: any;
}
