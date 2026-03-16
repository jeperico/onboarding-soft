interface FormHandlerResponse {
  success: boolean;
  message: string;
  errors: ErrorResponse | null;
}

type ErrorResponse = {
  field: string;
  message: string;
}[];

export { FormHandlerResponse, ErrorResponse };
