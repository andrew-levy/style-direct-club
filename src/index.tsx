import { ComponentProps, createElement } from 'react';
import { allowedProps } from './allowedProps';
import { Text, View } from 'react-native';

/**
 * A helper function to add style props to a component. This isn't necessary,
 * but it makes it easier to style components.
 *
 * @example
 *
 * ```
 * // Use the `styled` function to add the style props to the component.
 * const Text = styled(RNText)
 *
 * // Instead of this:
 * <Text style={{ color: "red", marginTop: 10 }} />
 *
 * // We can do this:
 * <Text color="red" marginTop={10} />
 * ```
 *
 * @example
 *
 * ```
 * // Use the built-in components.
 * const Text = styled.Text
 * const View = styled.View
 * ```
 *
 */
export function styled<T extends React.ComponentType<any>>(component: T) {
  type AllProps = ComponentProps<T>;
  type MappedStyleProps = AllProps extends { style?: infer S } ? S : {};

  return function StyledComponent(props: AllProps & MappedStyleProps) {
    return createElement(component, {
      ...props,
      style: { ...props.style, ...mapStyleProps(props) },
    });
  };
}

function mapStyleProps(props: Record<string, any>) {
  const styleProps: Record<string, any> = {};
  if (props) {
    Object.keys(props).forEach((key) => {
      if (allowedProps.includes(key)) {
        styleProps[key] = props[key];
      }
    });
  }
  return styleProps;
}

styled.Text = styled(Text);
styled.View = styled(View);
