import merge from 'merge';
import { wrapWithElement } from './XMLUtils';

const defaultOptions = {
  bank: {},
  email: {},
};

interface ISellerOotions {
  bank?: { name: string; accountNumber: string };
  email?: {
    replyToAddress: string;
    subject: string;
    message: string;
  };
  issuerName?: string;
}

export class Seller {
  _options: ISellerOotions;

  constructor(options: ISellerOotions) {
    this._options = merge.recursive(defaultOptions, options || {});
  }

  _generateXML(indentLevel = 0) {
    indentLevel = indentLevel || 0;
    return wrapWithElement(
      'elado',
      [
        ['bank', this._options.bank.name],
        ['bankszamlaszam', this._options.bank.accountNumber],
        ['emailReplyto', this._options.email.replyToAddress],
        ['emailTargy', this._options.email.subject],
        ['emailSzoveg', this._options.email.message],
        ['alairoNeve', this._options.issuerName],
      ],
      indentLevel,
    );
  }
}
