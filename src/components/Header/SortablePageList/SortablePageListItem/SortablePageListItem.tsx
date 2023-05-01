import styles from "./SortablePageListItem.module.scss";
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Badge } from "@suid/material";
import { Show, createMemo } from "solid-js";
import { AppPage } from "../../../../types";
import { useNavigate, useLocation } from "@solidjs/router";
import pageManager from "../../../../states/pageManager";
import { createSortable, useDragDropContext } from "@thisbeyond/solid-dnd";

function SortablePageListItem(props: { page: AppPage, isOverlay?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isOverlay = createMemo(() => props.isOverlay)
  const isSettings = createMemo(() => props.page.route === '/settings')
  const canUseSortable = createMemo(() => !isSettings() && !isOverlay());
  const { selectPage } = pageManager;

  const navigatePage = (route: string) => {
    selectPage(route as any);
    navigate(route);
  }

  const sortable = canUseSortable() ? createSortable(props.page.route) : null;
  const [state] = useDragDropContext() ?? [null];
  const pathname = createMemo(() => location.pathname);

  const isInCurrentPage = (path: string, isActiveDraggable?: boolean) => {
    const baseObj = {
      transition: !!state?.active?.draggable ? "all 0.1s" : 'none',
      zIndex: 9000000,
      opacity: !isActiveDraggable ? 1 : 0.25
    };

    return pathname() === path ? {
      ...baseObj,
      color: '#007eff',
      fill: '#007eff',
    } : baseObj
  }

  return (
    <>
      <Show when={isSettings()}>
        <Box sx={{ flexGrow: 1 }} />
      </Show>
      <ListItem
        disablePadding
        sx={isInCurrentPage(props.page.route, sortable?.isActiveDraggable)}
        ref={(el) => canUseSortable() ? sortable!(el) : null}
      >
        <ListItemButton disabled={props.page.disabled?.() ?? false} onClick={() => navigatePage(props.page.route)}>
          <ListItemIcon>
            <Badge variant="dot" color="primary" invisible={!props.page.shouldShowNotification?.()}>
              <props.page.iconComponent sx={isInCurrentPage(props.page.route, sortable?.isActiveDraggable)} />
            </Badge>
          </ListItemIcon>
          <ListItemText primary={props.page.name} />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default SortablePageListItem;