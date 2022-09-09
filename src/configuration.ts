import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import * as axios from '@midwayjs/axios';
import { join } from 'path';
import * as egg from '@midwayjs/web';

@Configuration({
  imports: [
    egg,
    axios, // 导入 axios 组件
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {}
}
