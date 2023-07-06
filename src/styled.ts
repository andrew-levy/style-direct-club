import { ComponentProps, createElement } from 'react';
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { allowedProps } from './allowedProps';
import type {
  AliasedStyles,
  CustomStyles,
  Options,
  StyleProps,
  StyledFunction,
} from './types';

/**
 * Creates a styled component, allowing you to pass style props directly to the component
 * instead of using the `style` prop or `StyleSheet.create`. Provide options to customize
 * your styling experience.
 *
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

function mapPropsToStyle<T extends Record<string, any>>(
  props: T,
  aliases?: Record<string, keyof StyleProps<T>>,
  customProps?: Record<string, StyleProps<T>>
): StyleProps<T> {
  let styleProps: StyleProps<T> = {};
  if (props) {
    Object.keys(props).forEach((key) => {
      if (customProps?.[key]) {
        styleProps = { ...styleProps, ...customProps[key] };
      } else {
        const keyOrAlias = aliases?.[key] || key;
        if (allowedProps.includes(keyOrAlias as string)) {
          styleProps[keyOrAlias] = props[key];
        }
      }
    });
  }
  return styleProps;
}

// Built-in components
styled.Text = styled(Text);
styled.View = styled(View);
styled.Pressable = styled(Pressable);
styled.TextInput = styled(TextInput);
styled.TouchableOpacity = styled(TouchableOpacity);
styled.Image = styled(Image);

// Add `withOptions` to built-in components
styled.Text.withOptions = <U extends Options<typeof Text>>(options: U) => {
  return styled(Text, options);
};

styled.View.withOptions = <U extends Options<typeof View>>(options: U) => {
  return styled(View, options);
};

styled.Pressable.withOptions = <U extends Options<typeof Pressable>>(
  options: U
) => {
  return styled(Pressable, options);
};

styled.TextInput.withOptions = <U extends Options<typeof TextInput>>(
  options: U
) => {
  return styled(TextInput, options);
};

styled.TouchableOpacity.withOptions = <
  U extends Options<typeof TouchableOpacity>
>(
  options: U
) => {
  return styled(TouchableOpacity, options);
};

styled.Image.withOptions = <U extends Options<typeof Image>>(options: U) => {
  return styled(Image, options);
};
