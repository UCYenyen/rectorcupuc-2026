export interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface FormProps<T> {
  mode: "create" | "edit";
  data?: T;
}

export interface ApplyButtonProps {
  activityId: string;
}

export interface UploadWidgetProps {
  onUploadSuccess: (url: string, publicId?: string) => void;
  folder: string;
  allowedFormats: string[];
}
