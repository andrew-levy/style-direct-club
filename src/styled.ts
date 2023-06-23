import { ComponentProps, createElement } from 'react';
import { allowedProps } from './allowedProps';
import { StyleProp, Text, View } from 'react-native';

type Options<T extends React.ComponentType<any>> = {
  alias?: Record<string, keyof AliasMap<T>>;
  defaultStyles?: AliasMap<T>;
};

type AliasMap<T extends React.ComponentType<any>> = ComponentProps<T> extends {
  style?: infer S;
}
  ? S extends StyleProp<infer P>
    ? Exclude<P, false | null | undefined>
    : {}
  : {};

/**
 * Creates a styled component, allowing you to pass style props directly to the component
 * instead of using the `style` prop or `StyleSheet.create`. Prop names can be aliased, and
 * default styles can be provided.
 */
export function styled<
  T extends React.ComponentType<any>,
  U extends Options<T> = {}
>(component: T, options: U = {} as U) {
  type BaseProps = ComponentProps<T>;
  type PropsWithAliasMap = BaseProps &
    // @ts-ignore
    Omit<AliasMap<T>, U['alias'][keyof U['alias']]> & {
      // @ts-ignore
      [k in keyof U['alias']]?: AliasMap<T>[U['alias'][k]];
    };

  return function StyledComponent(props: PropsWithAliasMap) {
    return createElement(component, {
      ...props,
      style: {
        ...(options?.defaultStyles || {}),
        ...props.style,
        ...mapStyleProps(props, options?.alias),
      },
    });
  };
}

function mapStyleProps(
  props: Record<string, any>,
  aliasMap?: Record<string, any>
) {
  const styleProps: Record<string, any> = {};
  if (props) {
    Object.keys(props).forEach((key) => {
      const keyOrAlias = aliasMap?.[key] || key;
      if (allowedProps.includes(keyOrAlias)) {
        styleProps[keyOrAlias] = props[key];
      }
    });
  }
  return styleProps;
}

styled.Text = styled(Text);
styled.View = styled(View);
