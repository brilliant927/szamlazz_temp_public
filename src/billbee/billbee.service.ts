import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { catchError, lastValueFrom, map } from 'rxjs';

import { OrderListDto } from './dtos/orderList.dto';
import { OrderListGetDto } from './dtos/orderListGet.dto';

@Injectable()
export class BillbeeService {
  constructor(private readonly httpService: HttpService) {}

  private config: AxiosRequestConfig = {
    baseURL: process.env.BILLBEE_API_BASE_URL,
    headers: {
      'X-Billbee-Api-Key': process.env.BILLBEE_API_KEY,
      Authorization:
        'Basic ' +
        Buffer.from(
          `${process.env.BILLBEE_USER_EMAIL}:${process.env.BILLBEE_USER_PASSWORD}`,
        ).toString('base64'),
    },
  };

  async getOrderList(query: OrderListGetDto): Promise<OrderListDto> {
    const request = this.httpService
      .get('orders', {
        ...this.config,
        params: { ...query },
      })
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
    return await lastValueFrom(request);
  }
}
