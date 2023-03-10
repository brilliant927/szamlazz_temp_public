import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';

enum ArticleTitleSourceType {
  OrderPosition = 0,
  ArticleTitle = 1,
  ArticleInvoiceText = 2,
}

export class OrderListGetDto {
  @ApiProperty({
    description: 'Specifies the oldest order date to include in the response',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  minOrderDate: Date;

  @ApiProperty({
    description: 'Specifies the newest order date to include in the response',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  maxOrderDate: Date;

  @ApiProperty({
    description: 'Specifies the page to request',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  page: number;

  @ApiProperty({
    description: 'Specifies the pagesize. Defaults to 50, max value is 250',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  pageSize: number;

  @ApiProperty({
    description:
      'Specifies a list of shop ids for which invoices should be included',
    required: false,
    type: () => Number,
    isArray: true,
  })
  @IsOptional()
  shopId: number[];

  @ApiProperty({
    description: 'Specifies a list of state ids to include in the response',
    required: false,
    type: () => Number,
    isArray: true,
  })
  @IsOptional()
  orderStateId: number[];

  @ApiProperty({
    description:
      'Specifies a list of tags the order must have attached to be included in the response',
    required: false,
    type: () => String,
    isArray: true,
  })
  @IsOptional()
  tag: string[];

  @ApiProperty({
    description:
      'If given, all delivered orders have an Id greater than or equal to the given minimumOrderId',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  minimumBillBeeOrderId: number;

  @ApiProperty({
    description:
      'If given, the last modification has to be newer than the given date',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  modifiedAtMin: Date;

  @ApiProperty({
    description:
      'If given, the last modification has to be older or equal than the given date.',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  modifiedAtMax: Date;

  @ApiProperty({
    description:
      'The source field for the article title. 0 = Order Position (default), 1 = Article Title, 2 = Article Invoice Text',
    required: false,
  })
  @IsOptional()
  @IsEnum(ArticleTitleSourceType)
  articleTitleSource: ArticleTitleSourceType;

  @ApiProperty({
    description:
      'If true the list of tags passed to the call are used to filter orders to not include these tags',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  excludeTags: boolean;
}
