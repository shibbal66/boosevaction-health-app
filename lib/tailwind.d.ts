/**
 * Type declaration for our tailwind instance.
 * Theme color keys from tailwind.config.js; color() returns string so callers don't need to cast.
 */
import type { TailwindFn } from 'twrnc';

type ThemeColorKey =
  | 'darkGreen'
  | 'red'
  | 'offWhite'
  | 'navy'
  | 'navyDark'
  | 'navyDeep'
  | 'navyMid'
  | 'navyLight'
  | 'orange'
  | 'orangeDim'
  | 'orangeDark'
  | 'orangeLight'
  | 'teal'
  | 'tealLight'
  | 'tealDim'
  | 'offWhite2'
  | 'muted'
  | 'muted2'
  | 'cardBg'
  | 'cardBorder'
  | (string & {}); // allow modifier keys like 'navyDark/60'

interface OurTailwindFn extends TailwindFn {
  color: (key: ThemeColorKey) => string;
}

declare const tw: OurTailwindFn;

export default tw;
