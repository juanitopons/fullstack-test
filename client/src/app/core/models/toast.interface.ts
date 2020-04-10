export interface IToast {
  id: string;
  message: string;
  style: ToastStyles;
  options?: ToastOptions;
}

export interface ToastOptions {
  duration?: number;
  closeString?: string;
}

export enum ToastStyles {
  SUCCESS = 'toast-success',
  INFO = 'toast-info',
  WARNING = 'toast-warning',
  ERROR = 'toast-error'
}

export const ToastDefaults = {
  CLOSE_STR: 'Close',
  DURATION: 500,
};
