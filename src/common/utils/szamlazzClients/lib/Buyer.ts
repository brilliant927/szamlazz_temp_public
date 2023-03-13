import * as assert from 'assert';
import merge from 'merge';
import { TaxSubject, TaxSubjects } from './Constants';
import { wrapWithElement } from './XMLUtils';

const defaultOptions = {
  postAddress: {},
  taxSubject: TaxSubjects.Unknown,
};

interface IBuyerOptions {
  name?: string;
  zip?: string;
  city?: string;
  country?: string;
  address?: string;
  email?: string;
  sendEmail?: boolean;
  taxNumber?: string;
  taxNumberEU?: string;
  taxSubject?: TaxSubject;
  postAddress?: {
    name?: string;
    country?: string;
    city?: string;
    address?: string;
    zip?: string;
  };
  identifier?: number;
  issuerName?: string;
  phone?: string;
  comment?: string;
}

export class Buyer {
  _options: IBuyerOptions;
  constructor(options) {
    this._options = merge.recursive(true, defaultOptions, options || {});
    this._options.taxSubject = options.taxSubject || defaultOptions.taxSubject;

    assert(
      this._options.taxSubject instanceof TaxSubject,
      'Valid TaxSubject field missing from buyer invoice options',
    );

    assert(
      typeof this._options.name === 'string' &&
        this._options.name.trim().length > 0,
      'Valid Name field missing from buyer options',
    );

    assert(
      typeof this._options.zip === 'string',
      'Zip field missing from buyer options',
    );

    assert(
      typeof this._options.city === 'string' &&
        this._options.city.trim().length > 0,
      'Valid City field missing from buyer options',
    );

    assert(
      typeof this._options.address === 'string' &&
        this._options.address.trim().length > 0,
      'Valid Address field missing from buyer options',
    );
  }

  _generateXML(indentLevel = 0) {
    indentLevel = indentLevel || 0;

    return wrapWithElement(
      'vevo',
      [
        ['nev', this._options.name],
        ['orszag', this._options.country],
        ['irsz', this._options.zip],
        ['telepules', this._options.city],
        ['cim', this._options.address],
        ['email', this._options.email],
        ['sendEmail', this._options.sendEmail],
        ['adoalany', this._options.taxSubject],
        ['adoszam', this._options.taxNumber],
        ['adoszamEU', this._options.taxNumberEU],
        ['postazasiNev', this._options.postAddress.name],
        ['postazasiOrszag', this._options.postAddress.country],
        ['postazasiIrsz', this._options.postAddress.zip],
        ['postazasiTelepules', this._options.postAddress.city],
        ['postazasiCim', this._options.postAddress.address],
        ['azonosito', this._options.identifier],
        ['alairoNeve', this._options.issuerName],
        ['telefonszam', this._options.phone],
        ['megjegyzes', this._options.comment],
      ],
      indentLevel,
    );
  }
}
