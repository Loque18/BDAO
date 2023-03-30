import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'bigNumber',
})
export class BigNumberPipe implements PipeTransform {
	transform(value: string, decimals: number, precision: number = 2): unknown {
		const numStr = value.toString();

		const intPart = numStr.slice(0, -decimals);
		const decPart = numStr.slice(-decimals);

		// use only deciamls from precision
		const decPartWithPrecision = decPart.slice(0, precision);

		const numWithDec = `${intPart}.${decPartWithPrecision}`;

		return parseFloat(numWithDec);
	}
}
