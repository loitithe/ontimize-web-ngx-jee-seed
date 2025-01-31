import { Component, OnInit } from '@angular/core';
import { FilterExpressionUtils,Expression } from 'ontimize-web-ngx';

import { intRateMonthlyFunction } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-accounts-home',
  templateUrl: './accounts-home.component.html',
  styleUrls: ['./accounts-home.component.css']
})
export class AccountsHomeComponent implements OnInit{
  public intRateMonthly = intRateMonthlyFunction;

  constructor() { }

  ngOnInit() {
  }

  createFilter(values: Array<{ attr, value }>): Expression {
    let filters: Array<Expression> = [];
    values.forEach(fil => {
      if (fil.value) {
        if (fil.attr === 'STARTDATE_I') {
          filters.push(FilterExpressionUtils.buildExpressionMoreEqual('STARTDATE', fil.value));
        }
        if (fil.attr === 'STARTDATE_E') {
          filters.push(FilterExpressionUtils.buildExpressionLessEqual('STARTDATE', fil.value));
        }
        if (fil.attr === 'ENDDATE_I') {
          filters.push(FilterExpressionUtils.buildExpressionMoreEqual('ENDDATE', fil.value));
        }
        if (fil.attr === 'ENDDATE_E') {
          filters.push(FilterExpressionUtils.buildExpressionLessEqual('ENDDATE', fil.value));
        }
      }
    });

    if (filters.length > 0) {
      return filters.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND));
    } else {
      return null;
    }
  }
}
