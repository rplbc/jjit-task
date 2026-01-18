import { formatDate } from '@/utils/format-date';

interface FormattedDateProps {
  children: string;
}

export function FormattedDate({ children }: FormattedDateProps) {
  return formatDate(children);
}
