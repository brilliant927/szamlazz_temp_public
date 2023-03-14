import { BadRequestException, Injectable } from '@nestjs/common';
import { vatRate } from 'src/common/constants/vatRate';
import {
  Buyer,
  Client,
  Currencies,
  Currency,
  Invoice,
  Item,
  Languages,
  PaymentMethod,
  PaymentMethods,
  Seller,
} from 'src/common/utils/szamlazzClients';

import { OrderDto, OrderItemDto } from '../billbee/dtos/order.dto';
import { billbeePaymentType } from '../common/constants/billbeePaymentType';

@Injectable()
export class SzamlazzService {
  async createNewInvoce(billbeeOrder: OrderDto): Promise<any> {
    try {
      const szamlazzClient = new Client({
        authToken: process.env.SZAMLAZZ_API_KEY,
        invoiceId: billbeeOrder.Id,
      });

      const seller = new Seller({
        bank: {
          name: 'MKB BANK NYRT',
          accountNumber: 'HU56103000021328620000014881',
        },
        email: {
          replyToAddress: 'stevenplaysase@outlook.com',
          subject: 'Invoice created',
          message: 'This is an email message',
        },
        issuerName: 'Issuer Name',
      });

      const buyer = new Buyer({
        name: `${billbeeOrder.InvoiceAddress.FirstName} ${billbeeOrder.InvoiceAddress.LastName}`,
        country: billbeeOrder.InvoiceAddress.Country,
        zip: billbeeOrder.InvoiceAddress.Zip,
        city: billbeeOrder.InvoiceAddress.City,
        email: billbeeOrder.InvoiceAddress.Email,
        sendEmail: false,
        address: `${billbeeOrder.InvoiceAddress.Street} ${billbeeOrder.InvoiceAddress.HouseNumber}`,
        taxNumber: billbeeOrder.TaxRate1,
        postAddress: {
          name: billbeeOrder.ShippingAddress.FirstName,
          zip: billbeeOrder.ShippingAddress.Zip,
          city: billbeeOrder.ShippingAddress.City,
          address: `${billbeeOrder.ShippingAddress.Street} ${billbeeOrder.ShippingAddress.HouseNumber}`,
        },
        issuerName: billbeeOrder.InvoiceAddress.BillbeeId,
        identifier: 1,
        phone: billbeeOrder.InvoiceAddress.Phone,
        comment: '',
      });

      // If buyer is from Germany, use TaxRate1, but if buyer comes from ohter countries, use default value
      const soldItems = billbeeOrder.OrderItems.map(
        (orderItem: OrderItemDto) =>
          new Item({
            label: orderItem.Product.Title,
            quantity: orderItem.Quantity,
            unit: ' ',
            vat:
              billbeeOrder.InvoiceAddress.Country == 'DE'
                ? billbeeOrder.TaxRate1
                : vatRate[billbeeOrder.InvoiceAddress.Country],
            grossUnitPrice: orderItem.TotalPrice / orderItem.Quantity,
            comment: '',
          }),
      );

      const billbeePaymentMethod = billbeePaymentType.find(
        (type) => type.Id == billbeeOrder.PaymentMethod,
      );

      const invoice = new Invoice({
        paymentMethod: billbeePaymentMethod
          ? new PaymentMethod(
              billbeePaymentMethod.Name,
              'billbee payment method',
            )
          : PaymentMethods.BankTransfer, // optional, default: BankTransfer
        currency: Currencies[billbeeOrder.Currency]
          ? Currencies[billbeeOrder.Currency]
          : new Currency(billbeeOrder.Currency, 2, 'Custom currency'), // optional, default: Ft
        language: Languages.Hungarian, // optional, default: Hungarian
        exchangeBank: billbeeOrder.Seller.Platform,
        exchangeRate: billbeeOrder.TaxRate1,
        orderNumber: billbeeOrder.OrderNumber,
        seller: seller, // the seller, required
        buyer: buyer, // the buyer, required
        items: soldItems, // the sold items, required
      });

      const result = await szamlazzClient.issueInvoice(invoice);
      return result;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
      return e;
    }
  }
}
