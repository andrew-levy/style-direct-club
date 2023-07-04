import { ComponentProps, createElement } from 'react';
import { allowedProps } from './allowedProps';
import { StyleProp, Text, View } from 'react-native';

type Prettify<T> = {
  [k in keyof T]: T[k] extends string | number | boolean | undefined | null
    ? T[k]
    : T[k] extends object
    ? Prettify<T[k]>
    : never;
};

type Options<T extends React.ComponentType<any>> = {
  aliases?: Record<string, keyof StyleObject<T>>;
  defaultStyles?: StyleObject<T>;
  customProps?: Prettify<Record<string, StyleObject<T>>>;
};

type AliasedStyles<
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

type StyleObject<T extends React.ComponentType<any>> = Exclude<
  ComponentProps<T> extends {
    style?: infer S;
  }
    ? S extends StyleProp<infer P>
      ? Exclude<P, false | null | undefined>
      : {}
    : {},
  (...args: any[]) => any
>;

type CustomStyles<
  T extends React.ComponentType<any>,
  U extends Options<T>
> = U['customProps'] extends Record<string, StyleObject<T>>
  ? {
      [k in keyof U['customProps']]?: boolean;
    }
  : {};

type StyledComponent<
  T extends React.ComponentType<any>,
  U extends Options<T>
> = (
  props: ComponentProps<T> | AliasedStyles<T, U> | CustomStyles<T, U>
) => JSX.Element;

type StyledFunction = {
  <T extends React.ComponentType<any>>(component: T): StyledComponent<T, {}>;
  <T extends React.ComponentType<any>, U extends Options<T>>(
    component: T,
    options: U
  ): StyledComponent<T, U>;
  Text: StyledComponent<typeof Text, {}>;
  View: StyledComponent<typeof View, {}>;
};

/**
 * Creates a styled component, allowing you to pass style props directly to the component
 * instead of using the `style` prop or `StyleSheet.create`. Provide options to customize
 * your styling experience.
 */
export const styled: StyledFunction = (
  component: React.ComponentType<any>,
  options?: Options<typeof component>
) => {
  type BaseProps = ComponentProps<typeof component>;
  type AliasedProps = AliasedStyles<
    typeof component,
    Exclude<typeof options, undefined>
  >;
  type CustomProps = CustomStyles<
    typeof component,
    Exclude<typeof options, undefined>
  >;

  return function StyledComponent(
    props: BaseProps | AliasedProps | CustomProps
  ) {
    return createElement(component, {
      ...props,
      style: {
        ...(options?.defaultStyles || {}),
        ...props.style,
        ...mapPropsToStyle(props, options?.aliases, options?.customProps),
      },
    });
  };
};

function mapPropsToStyle(
  props: Record<string, any>,
  aliases?: Record<string, any>,
  customProps?: Record<string, any>
) {
  let styleProps: Record<string, any> = {};
  if (props) {
    Object.keys(props).forEach((key) => {
      if (customProps?.[key]) {
        styleProps = { ...styleProps, ...customProps[key] };
      } else {
        const keyOrAlias = aliases?.[key] || key;
        if (allowedProps.includes(keyOrAlias)) {
          styleProps[keyOrAlias] = props[key];
        }
      }
    });
  }
  return styleProps;
}

styled.Text = styled(Text);
styled.View = styled(View);
