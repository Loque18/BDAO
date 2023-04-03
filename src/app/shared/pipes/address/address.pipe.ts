import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'address',
	standalone: true,
})
export class AddressPipe implements PipeTransform {
	transform(value: unknown, ...args: unknown[]): unknown {
		const rawAddress = value as string;

		// 0x1234567890123456789012345678901234567890 -> 0x1234...9012

		const firstPart = rawAddress.slice(0, 6);
		const lastPart = rawAddress.slice(-4);

		const address = `${firstPart}...${lastPart}`;

		return address;
	}
}
