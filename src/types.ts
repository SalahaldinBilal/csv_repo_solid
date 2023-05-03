import type { OverridableComponent } from "@suid/material/OverridableComponent";
import type { SvgIconTypeMap } from "@suid/material/SvgIcon";
import type { CognitoUserSession } from "amazon-cognito-identity-js";
import type { JSX } from "solid-js/jsx-runtime";

export type UserData = {
  username: string,
  loggedIn: boolean,
  session?: CognitoUserSession
}

export type TorrentInfo = {
  id: string;
  name: string;
  progress: number;
  downSpeed: number;
  upSpeed: number;
  created: Date;
  timeRemaining: number;
  isDone: boolean;
  uploadedFileCount?: number;
  totalNumberOfFiles?: number;
}

export enum FileSize {
  bytes = "bytes",
  kilobytes = "KiBs",
  megabytes = "MiBs",
  gigabytes = "GiBs"
}

export enum TimeFormat {
  millisecond = 1,
  second = 1000,
  minute = 60000,
  hour = 3600000,
  day = 86400000
}

export type ToolbarButton = {
  icon: JSX.Element,
  onClick: (...args: any[]) => any,
  color: "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning" | undefined
}

export const reverseObject = <K extends string, T extends string | number>(obj: Record<K, T>): Record<T, K> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return { ...acc, [value as string | number]: key }
  }, {} as Record<T, K>)
}

export type SnackbarType = "success" | "warning" | "information" | "error";

export type SnackbarMessage = {
  id: number,
  type: SnackbarType,
  duration: number,
  startTime: number,
  content: string
}

export const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const
export type Weekday = typeof weekdays[number]

export type ModalProps = {
  show: boolean;
  onHide?: () => any;
  children: JSX.Element;
  title?: string;
  width?: number | string;
  height?: number | string;
}

export type ButtonProps = {
  color?: `#${string}`;
  filled?: boolean;
  children?: JSX.Element;
  onClick?: JSX.EventHandler<HTMLButtonElement, MouseEvent>;
  style?: JSX.CSSProperties;
  isIcon?: boolean;
  noRadius?: boolean;
  disabled?: boolean;
}

export type AccordionProps = {
  title: string;
  children: JSX.Element;
  disabled?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export type InputProps = Partial<{
  color?: `#${string}`;
  min: number | string | undefined;
  max: number | string | undefined;
  value: string | number | string[] | undefined;
  type: string;
  placeholder: string;
  beforeInput: JSX.Element;
  afterInput: JSX.Element;
  onChange: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onClick: JSX.EventHandler<HTMLInputElement, MouseEvent>;
  style: JSX.CSSProperties;
  inputStyle: JSX.CSSProperties;
  alignText: "left" | "center" | "right";
  disallowEmpty: boolean;
  selectOnClick: boolean;
  disabled: boolean;
  borderless: boolean;
  noRadius: boolean;
  flipColors: boolean;
}>

export type LegendPropsTitle = { title: string };
export type LegendPropsItems<T extends string> = {
  title?: undefined,
  items: readonly T[],
  currentItem: T,
  onItemClick: (item: T) => any
};

export type LegendProps<T extends string> = {
  children: JSX.Element,
  style?: JSX.CSSProperties;
  color?: `#${string}`;
} & (LegendPropsTitle | LegendPropsItems<T>)

export type LegendPropsWithTitle<T extends string> = LegendProps<T> & LegendPropsTitle
export type LegendPropsWithItems<T extends string> = LegendProps<T> & Omit<LegendPropsItems<T>, "title">

export type TableDisplayFunc<T> = (dataPoint: T) => JSX.Element | string | null | undefined;

export type TableProps<T> = {
  data: readonly T[];
  hideHeaders?: boolean;
  isStyled?: boolean;
  disableSticky?: boolean;
  headers: {
    [header: string]: TableDisplayFunc<T> | { display: TableDisplayFunc<T>, style?: JSX.CSSProperties }
  };
}

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

export type AppPage = {
  name: string;
  route: string;
  iconComponent: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  disabled?: () => boolean;
  shouldShowNotification?: () => boolean;
}

export type ContextMenuMenuId = string | number;

export interface Pos {
  x: number;
  y: number;
}
export interface Size {
  width: number;
  height: number;
}

export type ContextMenuTriggerEvent = MouseEvent;

export type ShowContextMenuParams = {
  id: ContextMenuMenuId;
  event: ContextMenuTriggerEvent;
  props?: any;
  position?: Pos;
};

export type ContextMenuItemProps = {
  children: JSX.Element,
  icon?: any,
  onClick?: (event: MouseEvent) => void,
  disabled?: boolean,
  shouldCloseOnClick?: boolean
}

export type ContextMenuProps = {
  id: ContextMenuMenuId,
  children: JSX.Element
}

export type SelectItem<T> = {
  id: string | number,
  value: T,
  label: string
}

export type SelectProps<T> = {
  value: SelectItem<T>["id"],
  items: SelectItem<T>[],
  onItemClick: (item: SelectItem<T>) => any,
  flipColors?: boolean,
  noRadius?: boolean,
  borderless?: boolean,
  color?: `#${string}`,
  style?: JSX.CSSProperties
}

export type CsvFileData = {
  name: string,
  lastUpdate: string,
  size: number,
  hasDynamoTable: boolean
};