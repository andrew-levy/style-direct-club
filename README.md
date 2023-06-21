# style-direct-club

Apply styles directly to your React Native components via props!

## Installation

```sh
yarn add style-direct-club
```

## Usage

```js
import { Text, View } from 'react-native';
import { styled } from 'style-direct-club';

const StyledText = styled(Text);
const StyledView = styled(View);

function App() {
  return (
    <StyledView
      flex={1}
      rowGap={10}
      justifyContent="center"
      alignItems="center"
    >
      <StyledText color="red" fontSize={24}>
        Hello World!
      </StyledText>
      <StyledText color="blue" fontSize={16}>
        Styling is so easy!
      </StyledText>
    </StyledView>
  );
}
```

## To Do

- [ ] Add support for aliases (e.g. `backgroundColor` -> `bg`)
- [ ] Add out of the box components
