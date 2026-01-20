import { useFieldContext } from './form-context';

export function useFormErrorMessage() {
  const field = useFieldContext();

  const e = field.state.meta.errors?.[0];

  if (!field.state.meta.isTouched) {
    return undefined;
  }

  if (typeof e === 'string') {
    return e;
  }

  if (typeof e === 'object' && e !== null && 'message' in e) {
    return e.message as string;
  }

  return undefined;
}
