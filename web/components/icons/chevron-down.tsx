import { SvgIcon, type SvgIconProps } from '@mui/material';

function ChevronDownIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 20 20" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.33325 6.89294L4.30451 5.83325L9.99992 12.0472L15.6953 5.83325L16.6666 6.89294L9.99992 14.1666L3.33325 6.89294Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}

export { ChevronDownIcon };
