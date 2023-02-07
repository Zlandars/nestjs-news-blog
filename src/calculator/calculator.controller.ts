import { Body, Controller, Headers, Put } from '@nestjs/common';
import { CalculatorService } from './calculator.service';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculator: CalculatorService) {}

  @Put('/put')
  put(@Headers() headers, @Body() body) {
    return this.calculator.calc(body, headers['type-operation']);
  }
}
