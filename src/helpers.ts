import { Setter, onCleanup } from "solid-js";
import { FileSize, Pos, Size, TimeFormat, Weekday, weekdays } from "./types";
import { Countdown } from "@solid-primitives/date";

export const calculateSizeUnit = (sizeInByes: number) => {
  const units = [FileSize.bytes, FileSize.kilobytes, FileSize.megabytes, FileSize.gigabytes];
  let selectedUnit = 0;
  let value = sizeInByes;

  for (let i = 0; i < units.length; i++) {
    if (value / 1024 >= 1) {
      value /= 1024;
      selectedUnit++;
    } else break;
  }

  return {
    size: +value.toFixed(2),
    unit: units[selectedUnit]
  }
}

export const formatTime = (timeInMs: number) => {
  const values = [TimeFormat.day, TimeFormat.hour, TimeFormat.minute, TimeFormat.second].map(format => {
    const value = Math.trunc(timeInMs / format);
    timeInMs -= value * format;
    return value;
  })

  return {
    day: values[0],
    hour: values[1],
    minute: values[2],
    second: values[3]
  }
}

export const dateDifference = (firstDate: Date, secondDate: Date) => {
  const diff = Math.abs(firstDate.getTime() - secondDate.getTime());
  const diffObj = formatTime(diff);
  const tuples = Object.entries(diffObj);
  const biggestValue = tuples.find(([_, value]) => value > 0)

  return {
    rawDiff: diff,
    biggestValue: biggestValue ?? tuples[tuples.length - 1],
    diffObj
  }
}

export const createColors = (mainColor: `#${string}`) => {
  const hasAlpha = mainColor.length > 7;
  const sliceEnd = hasAlpha ? -2 : mainColor.length;

  return {
    backgroundColor: mainColor.slice(0, sliceEnd) + '14',
    rippleBackgroundColor: mainColor.slice(0, sliceEnd) + '40',
    borderColor: mainColor.slice(0, sliceEnd) + '80'
  } as const
}

export const increment = (setter: Setter<number>, max: number, by = 1) => {
  setter(val => (val + by) <= max ? val + by : val)
}

export const decrement = (setter: Setter<number>, min = 0, by = 1) => {
  setter(val => (val - by) >= min ? val - by : val)
}

export const typedObjectEntries = <T extends object>(obj: T) => {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}

export const startWeekdaysFrom = (weekday: Weekday) => {
  const indexOfWeekday = weekdays.indexOf(weekday);
  return weekdays.slice(indexOfWeekday).concat(weekdays.slice(0, indexOfWeekday));
}

export const getWeekday = (date: number | string | Date = Date.now()) => {
  return weekdays[(new Date(date)).getDay()];
}

export const notNull = <T>(value: T | undefined | null): value is T => {
  return value !== undefined && value !== null;
}

export const clickOutside = (el: HTMLElement, accessor: () => (() => void)) => {
  const onOutsideClick = accessor();
  const onClick = (e: MouseEvent) => {
    if (e.target instanceof Element && !el.contains(e.target))
      onOutsideClick();
  };

  document.body.addEventListener("click", onClick);
  onCleanup(() => document.body.removeEventListener("click", onClick));
}

export const calculateAxisValue = (clickPosition: number, elementSize: number, boxSize: number) => {
  if (clickPosition + elementSize <= boxSize) return clickPosition;
  if (clickPosition < elementSize) return boxSize - elementSize;
  return clickPosition - elementSize;
}

export const calculateContextMenuPosition = (clickPosition: Pos, elementSize: Size): Pos => {
  return {
    x: calculateAxisValue(clickPosition.x, elementSize.width, window.innerWidth),
    y: calculateAxisValue(clickPosition.y, elementSize.height, window.innerHeight),
  }
}

export const hasCountdownFinished = (countdown: Countdown | null | undefined): boolean => {
  return notNull(countdown) &&
    countdown.hours! <= 0 &&
    countdown.seconds! <= 0 &&
    countdown.minutes! <= 0
};

export const formatNumber = (num: number | undefined) => {
  return num?.toLocaleString("en-US", { minimumIntegerDigits: 2 })
}

export const countdownToString = (countdown: Countdown | null | undefined): string => {
  if (!notNull(countdown)) return "";

  let finalString = `${countdown.days ?? 0 > 0 ? countdown.days + "D" : ""} `;

  return finalString + `${formatNumber(countdown.hours)}:${formatNumber(countdown.minutes)}:${formatNumber(countdown.seconds)}`;
}

export const formatSize = (sizeInBytes: number) => {
  const output = calculateSizeUnit(sizeInBytes);
  return `${output.size} ${output.unit}`
}

export const toLocalString = (time: string | number) => {
  return (new Date(time)).toLocaleDateString()
}