import { Inject, Controller, Query, Get } from '@midwayjs/decorator';
import { Context } from 'egg';
import { InstagramService } from '../service/sInstagram';
import { IGetRootInfoResponse } from '../interfaces/iInstagram';

@Controller('/instagram')
export class InstagramController {
  @Inject()
  ctx: Context;

  @Inject()
  InstagramService: InstagramService;

  @Get('/account_info')
  async getAccountRootInfo(@Query('account_name') accountName: string): Promise<IGetRootInfoResponse> {
    const accountRootInfo = await this.InstagramService.getAccountRootInfo(accountName);
    return { Result: 200, ResultMessage: 'OK', ResultContent: accountRootInfo };
  }
}
