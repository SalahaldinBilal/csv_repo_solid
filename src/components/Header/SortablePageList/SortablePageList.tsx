import styles from "./SortablePageList.module.scss";
import { createSignal, For, createMemo } from "solid-js";
import pageManager from "../../../states/pageManager";
import { DragDropProvider, DragDropSensors, DragEvent, DragOverlay, SortableProvider, closestCenter } from "@thisbeyond/solid-dnd";
import SortablePageListItem from "./SortablePageListItem/SortablePageListItem";

function SortablePageList() {
  const { pageList } = pageManager;
  const { pageOrder, setPageOrder } = pageManager;
  const [activeItem, setActiveItem] = createSignal<ReturnType<typeof pageOrder>[number] | null>(null);
  const ids = () => pageOrder();

  const sortedPages = createMemo(() => {
    return pageOrder().map(pageRoute => pageList.find(page => page.route === pageRoute)!);
  })

  const onDragStart = ({ draggable }: DragEvent) => setActiveItem(draggable.id as ReturnType<typeof pageOrder>[number] | null);

  const onDragEnd = ({ draggable, droppable }: DragEvent) => {
    if (draggable && droppable) {
      const currentItems = ids();
      const fromIndex = currentItems.indexOf(draggable.id as ReturnType<typeof pageOrder>[number]);
      const toIndex = currentItems.indexOf(droppable.id as ReturnType<typeof pageOrder>[number]);
      if (fromIndex !== toIndex) {
        const updatedItems = currentItems.slice();
        updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
        setPageOrder(updatedItems);
      }
    }
  };

  return (
    <DragDropProvider
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      collisionDetector={closestCenter}
    >
      <DragDropSensors />
      <div style={{ display: 'flex', "flex-direction": "column", height: "100%" }}>
        <SortableProvider ids={ids().filter(e => e != '/settings')}>
          <For each={sortedPages()}>{page => <SortablePageListItem page={page} />}</For>
        </SortableProvider>
      </div>
      <DragOverlay style={{ "z-index": 9000000 }}>
        <SortablePageListItem page={pageList.find(e => e.route === activeItem())! ?? pageList[0]} isOverlay />
      </DragOverlay>
    </DragDropProvider>
  );
}

export default SortablePageList;