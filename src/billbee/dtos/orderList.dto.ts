import { OrderDto } from './order.dto';

class PagingDto {
  Page: number;
  TotalPages: number;
  TotalRows: number;
  PageSize: number;
}
export class OrderListDto {
  Paging: PagingDto;
  ErrorMessage: string | null;
  ErrorCode: number;
  ErrorDescription: string;
  Data: Array<OrderDto>;
}
