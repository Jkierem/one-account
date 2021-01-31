import { EnumType } from 'jazzi'

export const viewList = ["Login","Register","Home","Details","NotFound"];
export const verifyView = x => viewList.some(y => y === x) ? x : "NotFound"
export const Views = EnumType("View",viewList);

export default Views;