export const defaultViewStyleAliases = {
  bv: 'backfaceVisibility',
  bg: 'backgroundColor',
  rounded: 'borderRadius',
  items: 'alignItems',
  flex: 'flex',
  basis: 'flexBasis',
  grow: 'flexGrow',
  shrink: 'flexShrink',
  wrap: 'flexWrap',
  h: 'height',
  justify: 'justifyContent',
  m: 'margin',
  mb: 'marginBottom',
  me: 'marginEnd',
  mh: 'marginHorizontal',
  ml: 'marginLeft',
  mr: 'marginRight',
  ms: 'marginStart',
  mt: 'marginTop',
  mv: 'marginVertical',
  maxh: 'maxHeight',
  maxw: 'maxWidth',
  minh: 'minHeight',
  minw: 'minWidth',
  p: 'padding',
  pb: 'paddingBottom',
  pe: 'paddingEnd',
  ph: 'paddingHorizontal',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  ps: 'paddingStart',
  pt: 'paddingTop',
  pv: 'paddingVertical',
  pos: 'position',
  w: 'width',
  z: 'zIndex',
  tf: 'transform',
} as const;

export const defaultTextStyleAliases = {
  ...defaultViewStyleAliases,
  size: 'fontSize',
  family: 'fontFamily',
  weight: 'fontWeight',
  align: 'textAlign',
} as const;
