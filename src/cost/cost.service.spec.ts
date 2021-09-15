import { Test, TestingModule } from '@nestjs/testing';
import { CostService } from './cost.service';
import { PAYMENT_COSTS, MONTHS, PAYMENT_COST_NAMES } from './cost.mock';

jest.mock('stein-js-client', () => {
  return jest.fn().mockImplementation(() => {
    return {
      read: jest.fn().mockImplementation(() => {
        return {
          then: jest.fn(),
        };
      }),
    };
  });
});

describe('CostService', () => {
  let service: CostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CostService],
    }).compile();

    service = module.get<CostService>(CostService);

    Object.defineProperty(service, 'paymentCosts', {
      value: PAYMENT_COSTS,
    });

    Object.defineProperty(service, 'months', {
      value: MONTHS,
    });

    Object.defineProperty(service, 'paymentCostNames', {
      value: PAYMENT_COST_NAMES,
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('call getAllPaymentCosts', () => {
    expect(service.getAllPaymentCosts()).toEqual(PAYMENT_COSTS);
  });

  it('call getPaymentCost', () => {
    const ID = 3;
    const COST = PAYMENT_COSTS.find((cost) => cost.id === ID);
    expect(service.getPaymentCost(ID)).toEqual(COST);
  });

  it('call getMonths', () => {
    expect(service.getMonths()).toEqual(MONTHS);
  });

  it('call getPaymentCostNames', () => {
    expect(service.getPaymentCostNames()).toEqual(PAYMENT_COST_NAMES);
  });
});
