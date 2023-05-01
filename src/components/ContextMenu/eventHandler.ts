import mitt from "mitt";
import { ContextMenuMenuId, ShowContextMenuParams } from "../../types";

type Events = {
  show: ShowContextMenuParams;
  hide: ContextMenuMenuId;
  hideAll: void;
};

export const contextMenuEventHandler = mitt<Events>();