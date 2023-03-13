class AddressDto {
  BillbeeId: number;
  FirstName: string;
  LastName: string;
  Company: string;
  NameAddition: string | null;
  Street: string;
  HouseNumber: string;
  Zip: string;
  City: string;
  CountryISO2: string;
  Country: string;
  Line2: string;
  Email: string;
  State: string;
  Phone: string | null;
}

class ProductDto {
  OldId: string | null;
  Id: string | null;
  Title: string | null;
  Weight: string | null;
  SKU: string | null;
  SkuOrId: string | null;
  IsDigital: string | null;
  Images: string | null;
  EAN: string | null;
  PlatformData: string | null;
  TARICCode: string | null;
  CountryOfOrigin: string | null;
  BillbeeId: string | null;
  Type: string | null;
}

export class OrderItemDto {
  BillbeeId: number;
  TransactionId: string | null;
  Product: ProductDto;
  Quantity: number;
  TotalPrice: number;
  TaxAmount: number;
  TaxIndex: number;
  Discount: number;
  Attributes: Array<any>;
  GetPriceFromArticleIfAny: boolean;
  IsCoupon: boolean;
  ShippingProfileId: string | null;
  DontAdjustStock: boolean;
  UnrebatedTotalPrice: number;
  SerialNumber: string | null;
  InvoiceSKU: string | null;
}

class PersonDto {
  Platform: string | null;
  BillbeeShopName: string | null;
  BillbeeShopId: number;
  Id: string;
  Nick: string | null;
  FirstName: string | null;
  LastName: string | null;
  FullName: string;
  Email: string;
}

class CustomerDto {
  Id: number;
  Name: string;
  Email: string;
  Tel1: string | null;
  Tel2: string | null;
  Number: number;
  PriceGroupId: string | null;
  LanguageId: string | null;
  DefaultMailAddress: CustomerMailAddressDto;
  DefaultCommercialMailAddress: CustomerMailAddressDto | null;
  DefaultStatusUpdatesMailAddress: CustomerMailAddressDto | null;
  DefaultPhone1: string | null;
  DefaultPhone2: string | null;
  DefaultFax: string | null;
  VatId: string | null;
  Type: string | null;
  MetaData: Array<CustomerMailAddressDto>;
  ArchivedAt: string | null;
  RestoredAt: string | null;
}

class CustomerMailAddressDto {
  Id: number;
  TypeId: number;
  TypeName: string;
  SubType: string;
  Value: string;
}

class HistoryDto {
  Created: string;
  EventTypeName: string;
  Text: string;
  EmployeeName: string | null;
  TypeId: number;
}

export class OrderDto {
  RebateDifference: number;
  ShippingIds: Array<any>;
  AcceptLossOfReturnRight: boolean;
  Id: string;
  OrderNumber: string;
  State: number;
  VatMode: number;
  CreatedAt: string;
  ShippedAt: string | null;
  ConfirmedAt: string | null;
  PayedAt: string;
  SellerComment: string | null;
  Comments: Array<any>;
  InvoiceNumberPrefix: string;
  InvoiceNumberPostfix: string | null;
  InvoiceNumber: number;
  InvoiceDate: string;
  InvoiceAddress: AddressDto;
  ShippingAddress: AddressDto;
  PaymentMethod: number;
  ShippingCost: number;
  TotalCost: number;
  AdjustmentCost: number;
  AdjustmentReason: string | null;
  OrderItems: Array<OrderItemDto>;
  Currency: string;
  Seller: PersonDto;
  Buyer: any;
  UpdatedAt: string | null;
  TaxRate1: number;
  TaxRate2: number;
  BillBeeOrderId: number;
  BillBeeParentOrderId: number | null;
  VatId: number | null;
  Tags: Array<string>;
  ShipWeightKg: number | null;
  LanguageCode: string | null;
  PaidAmount: number;
  ShippingProfileId: string | null;
  ShippingProviderId: string | null;
  ShippingProviderProductId: string | null;
  ShippingProviderName: string | null;
  ShippingProviderProductName: string | null;
  ShippingProfileName: string | null;
  PaymentInstruction: string | null;
  IsCancelationFor: string | null;
  PaymentTransactionId: string | null;
  DistributionCenter: string | null;
  DeliverySourceCountryCode: string;
  CustomInvoiceNote: string | null;
  CustomerNumber: number;
  PaymentReference: string | null;
  ShippingServices: string | null;
  Customer: CustomerDto;
  History: Array<HistoryDto>;
  Payments: Array<any>;
  LastModifiedAt: string | null;
  ArchivedAt: string | null;
  RestoredAt: string | null;
  ApiAccountId: number;
  ApiAccountName: string;
  MerchantVatId: string | null;
  CustomerVatId: string | null;
  IsFromBillbeeApi: boolean;
}
