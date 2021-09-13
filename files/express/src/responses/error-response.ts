export interface ErrorResponse {
  status: number;
  message: string;
  error?: any;
}

export const errorResponse = ({
  status,
  message,
  error,
}: ErrorResponse): ErrorResponse => {
  const response = {
    status,
    message,
    error,
  };

  return response;
};
