/**
 * @description Instagram-Service root info
 */
export interface IRootInfo {
  accountId: string;
  accoutName: string;
  profile: {
    picUrl: string;
    picUrlHd: string;
  };
  hasNextPage: boolean;
  endCursor: string;
}

/**
 * @description Instagram-Service root info response
 */
export interface IGetRootInfoResponse {
  Result: number;
  ResultMessage: string;
  ResultContent: IRootInfo;
}
