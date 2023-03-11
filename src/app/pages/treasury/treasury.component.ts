import { Component } from '@angular/core';
import { Itreasury , items } from 'src/app/constants/brick-treasury';

@Component({
  selector: 'app-treasury',
  templateUrl: './treasury.component.html',
  styleUrls: ['./treasury.component.scss']
})
export class TreasuryComponent {
title  = "Bricklayer Treasury";
text1  = "Lorem ipsum dolor sit amet, consectetur"
text2  = "adipiscing elit, sed do eisumod tepmpor";
text3  = "incididunt ut labore et dolore magna aliqua";

items : Itreasury[] = items;
}
