import type { OverridableComponent } from "@suid/material/OverridableComponent";
import type { SvgIconTypeMap } from "@suid/material/SvgIcon";
import type { JSX } from "solid-js/jsx-runtime";

export type AuthResponse = {
  access_token: string,
  id_token: string,
  refresh_token: string,
  expires_in: number
}

export type UserData = {
  username: string,
  loggedIn: boolean,
  authData?: AuthResponse
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

export const NYAA_CATEGORY = {
  ALL: "0_0",
  ANIME: "1_0",
  ANIME_MUSIC_VIDEO: "1_1",
  ANIME_ENGLISH_TRANSLATED: "1_2",
  ANIME_NON_ENGLISH_TRANSLATED: "1_3",
  ANIME_RAW: "1_4",
  AUDIO: "2_0",
  AUDIO_LOSSLESS: "2_1",
  AUDIO_LOSSY: "2_2",
  LITERATURE: "3_0",
  LITERATURE_ENGLISH_TRANSLATED: "3_1",
  LITERATURE_NON_ENGLISH_TRANSLATED: "3_2",
  LITERATURE_RAW: "3_3",
  LIVE_ACTION: "4_0",
  LIVE_ACTION_ENGLISH_TRANSLATED: "4_1",
  LIVE_ACTION_IDOL_OR_PROMOTIONAL_VIDEO: "4_2",
  LIVE_ACTION_NON_ENGLISH_TRANSLATED: "4_3",
  LIVE_ACTION_RAW: "4_4",
} as const

export const NYAA_SORT_BY = {
  DATE: "id",
  COMMENTS: "comments",
  SIZE: "size",
  SEEDERS: "seeders",
  LEECHERS: "leechers",
  DOWNLOADS: "downloads"
} as const

export const NYAA_FILTER = {
  NO_FILTER: "0",
  NO_REMAKES: "1",
  TRUSTED_ONLY: "2",
} as const

export type NyaaCategory = typeof NYAA_CATEGORY[keyof typeof NYAA_CATEGORY]
export type NyaaSortBy = typeof NYAA_SORT_BY[keyof typeof NYAA_SORT_BY]
export type NyaaFilter = typeof NYAA_FILTER[keyof typeof NYAA_FILTER]

export type NyaaResult = {
  id: number,
  title: string,
  category: NyaaCategory,
  link: string,
  magnetLink: string,
  torrentLink: string,
  numberOfComments: number,
  size: string,
  date: number,
  seeders: number,
  leechers: number,
  downloads: number
}

export const reverseObject = <K extends string, T extends string | number>(obj: Record<K, T>): Record<T, K> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return { ...acc, [value as string | number]: key }
  }, {} as Record<T, K>)
}

// export const NYAA_CATEGORY_REVERSED = dannyBoy(NYAA_SORT_BY)
// a.comments
// type key = keyof typeof NYAA_CATEGORY

// export const NYAA_CATEGORY_REVERSED = Object.keys(NYAA_CATEGORY).reduce((acc, val) => {
//  return acc
// }, {} as { [K in nyaaCategory]: key })

export type MalAnime = {
  node: {
    id: number,
    title: string,
    main_picture: {
      medium: string,
      large: string
    }
  },
  list_status: {
    status: string,
    score: number,
    num_episodes_watched: number,
    is_rewatching: boolean,
    updated_at: string
  }
}

export type AniListResponse<T> = {
  data: {
    Media: T
  }
}

export type AniListAiringSchedule = {
  id: number;
  airingAt: number,
  episode: number
}

export type AniListRelationType = "ADAPTATION" | "PREQUEL" | "SEQUEL" | "PARENT" | "SIDE_STORY"
  | "CHARACTER" | "SUMMARY" | "ALTERNATIVE" | "SPIN_OFF" | "OTHER" | "SOURCE" | "COMPILATION" | "CONTAINS"

export type AniListTitle = {
  romaji: string;
  english: string;
}

export type AniListRelation = {
  id: number;
  relationType: AniListRelationType,
  node: {
    idMal: number,
    episodes: number | null;
    title: AniListTitle
  }
}

export type AniListAnimeStatus = "RELEASING" | "FINISHED" | "NOT_YET_RELEASED" | "CANCELLED";

export type AniListNextEpisodeResponse = AniListResponse<
  {
    status: AniListAnimeStatus,
    episodes: number,
    title: AniListTitle,
    nextAiringEpisode?: AniListAiringSchedule
    airingSchedule: {
      edges: { node: AniListAiringSchedule }[]
    },
    relations: {
      edges: AniListRelation[]
    }
  }
>

export type CachedAnimeData = {
  [key: number]: {
    aniList: AniListNextEpisodeResponse["data"]["Media"] & { lastUpdate: number },
    nyaa: {
      latestEp: number,
      lastUpdate: number
    }
  }
}

export const ANIME_LIST_FILTER = {
  ALL: 1,
  TODAY: 2,
  AIRING: 3,
  FINISHED: 4,
  SEASON_PTW: 5,
  DAILY_ANIME: 6
} as const

export type AnimeListFilter = typeof ANIME_LIST_FILTER[keyof typeof ANIME_LIST_FILTER]

export type B2FileInfo = {
  id: string,
  name: string,
  info: Record<string, any>,
  uploadTimestamp: number,
  size: number
}

export type DownloadProgressPayload = {
  id: number,
  progress: number,
  total: number,
  bytes_per_second: number,
  eta: number,
}

export type DownloadFinishPayload = {
  id: number,
  progress: number,
  total: number,
  bytes_per_second: number,
  eta: number,
}

export type FileDownloadDetails = {
  id: number,
  name: string,
  url: string,
  path: string
}

export type SnackbarType = "success" | "warning" | "information" | "error";

export type SnackbarMessage = {
  id: number,
  type: SnackbarType,
  duration: number,
  startTime: number,
  content: string
}

export type AppSettings = {
  app: {
    defaultPage: "/";
  },
  animeList: {
    finishedAutoCheckNyaa: boolean;
    finishedAutoCheckAniList: boolean;
    shouldHideEmptyDaily: boolean;
    todayCheckStart: number;
    todayCheckEnd: number;
    shouldShowNotYetAiringInDaily: boolean;
    daysToShowNotYetAiringInDaily: number;
    defaultTab: AnimeListFilter;
    dailyAiringDayStart: Weekday;
    animeInfoSize: "big" | "normal";
  },
  downloads: {
    videoPlayerLocation: string
  }
}

export const SETTINGS_TABS = {
  GENERAL: 0,
  ANIME_LIST: 1,
  DOWNLOADS: 2,
} as const

export type SettingsTabs = typeof SETTINGS_TABS[keyof typeof SETTINGS_TABS]

export const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const
export type Weekday = typeof weekdays[number]

export type AnimeCardProps = {
  // id: number,
  anime: MalAnime,
  filterType: AnimeListFilter,
  filterDay?: Weekday
}

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

export type FilteredDownloadList = Fuzzysort.KeyResult<{
  id: number;
  download?: DownloadProgressPayload | undefined;
  details?: FileDownloadDetails | undefined;
}>;

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

export type ModifyAnimeRequestBody = {
  id: number;
  dataToChange: AtLeastOne<{
    score: number,
    num_watched_episodes: number
  }>
}

export type ModifyAnimeResponseBody = {
  score: number,
  num_episodes_watched: number,
  updated_at: string
}

export type AppPage = {
  name: string;
  route: string;
  iconComponent: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  disabled?: () => boolean;
  shouldShowNotification?: () => boolean;
}

export type UserProgram = {
  name: string,
  version: string,
  exe: string
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

export type AnimeCardCoverProps = {
  lastNyaaUpdate: number | undefined,
  gettingNyaaData: boolean,
  shouldShowCard: boolean,
  shouldShowCover: boolean,
  isInPtwList: boolean,
  animeFinishedAiring: boolean,
  anime: MalAnime,
  status: AniListAnimeStatus,
  onDataRequest: (both: boolean) => void
}

export type AnimeCardTopProps = {
  isInsideCard: boolean,
  hasJustFinished: boolean,
  status: AniListAnimeStatus,
  loadingAniListData: boolean,
  shouldShowCard: boolean,
  animeFinishedAiring: boolean,
  airingAt: number | undefined,
  nextEpisode: number, onDataRequest: () => void
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

export type DeserializedAuthToken = {
  auth_time: number,
  client_id: string,
  event_id: string,
  exp: number,
  iat: number,
  iss: string,
  jti: string,
  origin_jti: string,
  scope: string,
  sub: string,
  token_use: string,
  username: string
}

export type DeserializedIdToken = {
  aud: string,
  auth_time: number,
  "cognito:username": string,
  email: string,
  email_verified: boolean,
  event_id: string,
  exp: number,
  iat: number,
  iss: string,
  jti: string,
  origin_jti: string,
  token_use: string,
}