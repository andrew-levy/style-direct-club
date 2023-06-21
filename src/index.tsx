import { ComponentProps, createElement } from 'react';

/**
 * A helper function to add style props to a component. This isn't necessary,
 * but it makes it easier to style components.
 *
 * This turns this:
 * ```
 * <Text style={{ color: "red", marginTop: 10 }} />
 * ```
 *
 * Into this:
 * ```
 * <Text color="red" marginTop={10} />
 * ```
 *
 */
export function styled<T extends React.ComponentType<any>>(component: T) {
  type AllProps = ComponentProps<T>;
  type MappedStyleProps = AllProps extends { style?: infer S } ? S : {};

  return function StyledComponent(props: AllProps & MappedStyleProps) {
    return createElement(component, {
      ...props,
      style: mapStyleProps(props),
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

const allowedProps = [
  'alignContent',
  'alignItems',
  'alignSelf',
  'aspectRatio',
  'borderBottomWidth',
  'borderEndWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderStartWidth',
  'borderTopWidth',
  'borderRadius',
  'borderWidth',
  'bottom',
  'display',
  'end',
  'flex',
  'flexBasis',
  'flexDirection',
  'rowGap',
  'gap',
  'columnGap',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'height',
  'justifyContent',
  'left',
  'margin',
  'marginBottom',
  'marginEnd',
  'marginHorizontal',
  'marginLeft',
  'marginRight',
  'marginStart',
  'marginTop',
  'marginVertical',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'overflow',
  'padding',
  'paddingBottom',
  'paddingEnd',
  'paddingHorizontal',
  'paddingLeft',
  'paddingRight',
  'paddingStart',
  'paddingTop',
  'paddingVertical',
  'position',
  'right',
  'start',
  'top',
  'width',
  'zIndex',
  'direction',
  'shadowColor',
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',
  'backgroundColor',
  'borderBottomColor',
  'borderBottomEndRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomStartRadius',
  'borderColor',
  'borderEndColor',
  'borderLeftColor',
  'borderRightColor',
  'borderStartColor',
  'borderStyle',
  'borderTopColor',
  'borderTopEndRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopStartRadius',
  'opacity',
  'elevation',
  'fontVariant',
  'letterSpacing',
  'textDecorationColor',
  'textDecorationStyle',
  'writingDirection',
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'lineHeight',
  'textAlign',
  'textDecorationLine',
  'textShadowColor',
  'textShadowOffset',
  'textShadowRadius',
  'textTransform',
  'resizeMode',
  'overlayColor',
  'tintColor',
];
