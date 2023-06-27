# style-direct-club

Apply styles directly to your React Native components via props!

- Fully type-safe
- No more `StyleSheet.create()` or `style={{ ... }}`
- Faster prototyping
- Custom aliases
- Default styles
- Custom shorthand props

## Installation

```sh
yarn add style-direct-club
```

## Usage

The `styled` function takes in a component and returns a styled component. A styled component can be used in place of the original and will accept extra style props. Apply styles directly to your components via props!

```tsx
import { TouchableOpacity } from 'react-native';
import { styled } from 'style-direct-club';

// Create a styled component
const StyledTouchableOpacity = styled(TouchableOpacity);

// Or use the out of the box components
const View = styled.View;
const Text = styled.Text;

// Use props to style your components directly
function App() {
  return (
    <View flex={1} rowGap={10} justifyContent="center" alignItems="center">
      <Text color="red" fontSize={24}>
        Hello World!
      </Text>
      <Text color="blue" fontSize={16}>
        Styling is so easy!
      </Text>
      <StyledTouchableOpacity backgroundColor="blue">
        <Text color="white">Press Me!</Text>
      </StyledTouchableOpacity>
    </View>
  );
}
```

## Options

### Aliases

Custom aliases allow you to define alternative names for each style prop. This is useful if you want to shorten the names for a more concise syntax. These are fully customizable, so you can agree upon standards with your team and stay consistent! In the aliases object, each key is the custom name, and each value is the original style prop name.

```tsx
import { styled, defaultViewStyleAliases } from 'style-direct-club';
import { View } from 'react-native';

const StyledView = styled(View, {
  aliases: {
    bg: 'backgroundColor',
    p: 'padding',
    m: 'margin',
    mt: 'marginTop',
  },
});

// Use your custom aliases
function App() {
  return (
    <StyledView bg="blue" p={10} m={10} mt={20}>
      <Text color="white">Hello World!</Text>
    </StyledView>
  );
}
```

Note: This library comes with a set of default aliases for the built in components. You can import them and use them in your styled components.

```tsx
import {
  defaultTextStyleAliases,
  defaultViewStyleAliases,
} from 'style-direct-club';
```

### Default Styles

Use default styles to set common styles for your components. These styles will be applied to every instance of the component and can be overridden with props.

```tsx
import { styled } from 'style-direct-club';
import { TouchableOpacity } from 'react-native';

const StyledTouchableOpacity = styled(TouchableOpacity, {
  defaultStyles: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
  },
});

// Default styles will be applies, and can be overridden with props
function App() {
  return (
    <StyledTouchableOpacity padding={5}>
      <Text color="white">Press Me!</Text>
    </StyledTouchableOpacity>
  );
}
```

### Custom Props

Custom props allow you to apply multiple styles with a single prop. These props are fully customizable and will be available as props in your component.

```tsx
import { styled } from 'style-direct-club';
import { Text } from 'react-native';

const StyledText = styled(Text, {
  customProps: {
    sm: {
      fontSize: 12,
      marginBottom: 5,
    },
    xl: {
      fontSize: 36,
      marginBottom: 10,
      fontWeight: 'bold',
    },
  },
});

function App() {
  return <StyledText xl>Hello World!</StyledText>;
}
```

## Gotchas

- The `style` prop is still supported, but props will take priority over the `style` prop object.
- If you want to add these props to a custom component, the component must pass its `style` prop to the underlying view.
- Default styles and custom props will not respect aliases. You must use the original style prop name.
- When using the built in components, you won't be able to pass additional options.
- If you use the out of the box Text and View components, you will not be able to pass in options like custom aliases.
