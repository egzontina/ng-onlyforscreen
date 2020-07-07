import {Injectable} from '@angular/core';

@Injectable()
export abstract class IConfig {
  mobile: number;
  tablet: number;
}

@Injectable()
export class ScreenService {

  iConfig: IConfig;

  constructor(private config: IConfig) {
    this.iConfig = config;
  }
}

export function screenWidthService( config: IConfig) {
  return () => new ScreenService(config);
}
