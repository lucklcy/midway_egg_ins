import { Inject, Provide } from '@midwayjs/decorator';
import { IRootInfo } from '../interfaces/iInstagram';
import { HttpServiceFactory } from '@midwayjs/axios';
const fs = require('fs');
const path = require('path');

@Provide()
export class InstagramService {
  @Inject()
  httpServiceFactory: HttpServiceFactory;

  async getAccountRootInfo(accountName: string): Promise<IRootInfo> {
    let returnResult: IRootInfo | null = null;
    const insAxiosClient = this.httpServiceFactory.get('insAxios');
    const accountRootPage = await insAxiosClient.get(`/${accountName}/`);
    const { data, status } = accountRootPage;
    if (status === 200 && data) {
      fs.writeFileSync(path.join(__dirname, `../../temp/ins/${accountName}.html`), data);
      const scriptReg = new RegExp(/<script.*?>([\s\S]+?)<\/script>/gim);
      const scriptArr = Array.from(data.matchAll(scriptReg));
      scriptArr.forEach(element => {
        const matchScriptStr = element[1];
        if (matchScriptStr.indexOf('\\/api\\/v1\\/users\\/web_profile_info\\/') > -1 && matchScriptStr.indexOf('PolarisQueryPreloaderCache') > -1) {
          const matchResponseReg = new RegExp(/"response":([\s\S]+?)[,]"status_code"/im);
          const matchResponse = matchScriptStr.match(matchResponseReg);
          if (matchResponse) {
            const matchResStr = matchResponse[1];
            const matchResToObj = JSON.parse(JSON.parse(matchResStr));
            const { id, username, profile_pic_url, profile_pic_url_hd, edge_owner_to_timeline_media } = matchResToObj?.data?.user || {};
            const { has_next_page, end_cursor } = edge_owner_to_timeline_media?.page_info || {};
            returnResult = {
              accountId: id,
              accoutName: username,
              profile: { picUrl: profile_pic_url, picUrlHd: profile_pic_url_hd },
              hasNextPage: has_next_page,
              endCursor: end_cursor,
            };
          }
        }
      });
    }
    return returnResult;
  }
}
