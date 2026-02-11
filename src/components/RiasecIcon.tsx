import {
  IconTool,
  IconMicroscope,
  IconPalette,
  IconUsersGroup,
  IconRocket,
  IconChartBar,
} from "@tabler/icons-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, any> = {
  IconTool,
  IconMicroscope,
  IconPalette,
  IconUsersGroup,
  IconRocket,
  IconChartBar,
};

interface RiasecIconProps {
  name: string;
  className?: string;
  size?: number;
  stroke?: number;
}

const RiasecIcon = ({ name, className, size, stroke }: RiasecIconProps) => {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className={className} size={size} stroke={stroke} />;
};

export default RiasecIcon;
