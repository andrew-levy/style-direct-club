import { ComponentProps } from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export type Prettify<T> = {
  [k in keyof T]: T[k] extends string | number | boolean | undefined | null
    ? T[k]
    : T[k] extends object
    ? Prettify<T[k]>
    : never;
};

export type Options<T extends React.ComponentType<any>> = {
  aliases?: Record<string, keyof StyleObject<T>>;
  defaultStyles?: StyleObject<T>;
  customProps?: Prettify<Record<string, StyleObject<T>>>;
};

export type AliasedStyles<
  T extends React.ComponentType<any>,
  U extends Options<T>
> = Omit<
  StyleObject<T>,
  U['aliases'][keyof U['aliases']] extends string
    ? U['aliases'][keyof U['aliases']]
    : never
> & {
  [k in keyof U['aliases']]?: StyleObject<T>[U['aliases'][k] extends keyof StyleObject<T>
    ? U['aliases'][k]
    : never];
};

export type StyleObject<T extends React.ComponentType<any>> = Exclude<
  ComponentProps<T> extends {
    style?: infer S;
  }
    ? S extends StyleProp<infer P>
      ? Exclude<P, false | null | undefined>
      : {}
    : {},
  (...args: any[]) => any
>;

export type CustomStyles<
  T extends React.ComponentType<any>,
  U extends Options<T>
> = U['customProps'] extends Record<string, StyleObject<T>>
  ? {
      [k in keyof U['customProps']]?: boolean;
    }
  : {};

export type StyledComponent<
  T extends React.ComponentType<any>,
  U extends Options<T>
> = (
  props: ComponentProps<T> | AliasedStyles<T, U> | CustomStyles<T, U>
) => JSX.Element;

type ExtendedStyledComponent<
  T extends React.ComponentType<any>,
  U extends Options<T>
> = StyledComponent<T, U> & {
  withOptions?: <V extends Options<T>>(options: V) => StyledComponent<T, U & V>;
};

export type StyledFunction = {
  <T extends React.ComponentType<any>>(component: T): StyledComponent<T, {}>;
  <T extends React.ComponentType<any>, U extends Options<T>>(
    component: T,
    options: U
  ): StyledComponent<T, U>;
  Text: ExtendedStyledComponent<typeof Text, {}>;
  View: ExtendedStyledComponent<typeof View, {}>;
  Pressable: ExtendedStyledComponent<typeof Pressable, {}>;
  TextInput: ExtendedStyledComponent<typeof TextInput, {}>;
  TouchableOpacity: ExtendedStyledComponent<typeof TouchableOpacity, {}>;
  Image: ExtendedStyledComponent<typeof Image, {}>;
};

export type StyleProps<T extends Record<string, any>> = {
  [K in keyof T]?: T[K] extends string | number | boolean
    ? T[K]
    : T[K] extends Record<string, any>
    ? StyleProps<T[K]>
    : never;
};
