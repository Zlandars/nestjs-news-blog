import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  calc(numb, operation: string): number | string {
    let big = parseInt(numb.num1);
    let less = parseInt(numb.num2);
    if (less > big) {
      less = big;
      big = parseInt(numb.num2);
    }
    switch (operation) {
      case 'plus':
        return less + big;
      case 'minus':
        return big - less;
      case 'multiply':
        return big * less;
      default:
        return 'Проверьте введенные данные';
    }
  }
}
