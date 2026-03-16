interface FormHandlerResponse {
  success: boolean;
  message: string;
  errors:
    | {
        field: string;
        message: string;
      }[]
    | null;
}

export { FormHandlerResponse };
