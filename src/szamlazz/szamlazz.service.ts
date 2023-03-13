import { Injectable } from '@nestjs/common';
import {
  Buyer,
  Client,
  Invoice,
  Item,
  Languages,
  Seller,
} from 'src/common/utils/szamlazzClients';

import { OrderDto, OrderItemDto } from '../billbee/dtos/order.dto';
import { billbeePaymentType } from '../common/constants/billbeePaymentType';

@Injectable()
export class SzamlazzService {
  async createNewInvoce(billbeeOrder: OrderDto): Promise<any> {
    const szamlazzClient = new Client({
      authToken: process.env.SZAMLAZZ_API_KEY,
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
      issuerName: '',
    });

    const buyer = new Buyer({
      name: `${billbeeOrder.InvoiceAddress.FirstName} ${billbeeOrder.InvoiceAddress.LastName}`,
      country: billbeeOrder.InvoiceAddress.Country,
      zip: billbeeOrder.InvoiceAddress.Zip,
      city: billbeeOrder.InvoiceAddress.City,
      address: `${billbeeOrder.InvoiceAddress.Street} ${billbeeOrder.InvoiceAddress.HouseNumber}`,
      taxNumber: '',
      postAddress: {
        name: billbeeOrder.ShippingAddress.FirstName,
        zip: billbeeOrder.ShippingAddress.Zip,
        city: billbeeOrder.ShippingAddress.City,
        address: `${billbeeOrder.ShippingAddress.Street} ${billbeeOrder.ShippingAddress.HouseNumber}`,
      },
      issuerName: '',
      identifier: 1,
      phone: '',
      comment: '',
    });

    const soldItems = billbeeOrder.OrderItems.map(
      (orderItem: OrderItemDto) =>
        new Item({
          label: orderItem.Product.Title,
          quantity: orderItem.Quantity,
          unit: ' ',
          vat: billbeeOrder.TaxRate1,
          netUnitPrice:
            (orderItem.TotalPrice - orderItem.TaxAmount) / orderItem.Quantity,
          comment: '',
        }),
    );
    const paymentMethod = billbeePaymentType.find(
      (type) => type.Id == billbeeOrder.PaymentMethod,
    );
    const invoice = new Invoice({
      paymentMethod: paymentMethod.Name || '', // optional, default: BankTransfer
      currency: billbeeOrder.Currency, // optional, default: Ft
      language: Languages.Hungarian, // optional, default: Hungarian
      seller: seller, // the seller, required
      buyer: buyer, // the buyer, required
      items: soldItems, // the sold items, required
    });

    const result = await szamlazzClient.issueInvoice(invoice);
    return result;
  }
}
