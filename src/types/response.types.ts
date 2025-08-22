export type TResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
};
