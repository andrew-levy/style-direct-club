# style-direct-club

Apply styles directly to your React Native components via props!

- Fully typed
- No more `StyleSheet.create` or `styles={{ ... }}`
- Faster prototyping
- Custom aliases
- Default styles

## Installation

```sh
yarn add style-direct-club
```

## Usage

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

## Custom Options

### Aliases

You can use aliases to make the style prop names more readable. Agree upon standards with your team and stay consistent!

Format your custom alias object like this: `{ aliasName: originalStyleName }`

```tsx
import { styled, defaultAlias } from 'style-direct-club';
import { View } from 'react-native';

// Use the default aliases
const StyledView = styled(View, {
  aliases: {
    // Use the default aliases
    ...defaultAlias,
    // Or add your own!
    bg: 'backgroundColor',
    p: 'padding',
    m: 'margin',
    mt: 'marginTop',
  },
});
```

### Default Styles

You can set common default styles for your components. These styles will be applied to every instance of the component and can be overridden with props.

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
```

## Gotchas

- The `style` prop is still supported, but styles passed in as props will take precedence over the `style` prop object.
- If you want to add these props to a custom component, the component must pass its props to the underlying view.
- Default styles will not respect aliases. You must use the original style prop name.
- When using the built in components, you won't be able to pass additional options.

```

```
