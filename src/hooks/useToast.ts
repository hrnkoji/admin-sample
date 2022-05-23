import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

type Severity = 'error' | 'success' | 'info' | 'warning' | undefined;
export interface ToastStateProps {
  open: boolean;
  message: string;
  severity: Severity;
}

export const toastState = atom<ToastStateProps>({
  key: 'common-toast',
  default: {
    open: false,
    message: '',
    severity: 'info',
  },
});

export function useToast() {
  const [state, setState] = useRecoilState<ToastStateProps>(toastState);

  const hide = useCallback(() => {
    setState((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  }, [setState]);

  const show = useCallback(
    (message: string, severity: Severity = 'info') => {
      setState((prev) => {
        return {
          ...prev,
          open: true,
          message: message,
          severity: severity,
        };
      });
    },
    [setState],
  );

  return {
    open: state.open,
    message: state.message,
    severity: state.severity,
    show,
    hide,
  };
}
