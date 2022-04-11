import {
    extendTheme,
    withDefaultColorScheme,
    theme as baseTheme,
  } from "@chakra-ui/react";
  import { Input } from "./components/input.theme";
  import { mode } from "@chakra-ui/theme-tools";
  import { Button } from "./components/button.theme";
  import { Container } from "./components/container.theme";
  import { Select } from "./components/select.theme";
  export const customTheme = extendTheme(
    {
      colors: {
        dark: {
          100: "#2E3440",
          200: "#292E39",
        },
        light: {
          100: "#FFFFFF",
          200: "#F8F9FB",
        },
      },
      styles: {
        global: (props) => ({
          body: {
            bg: mode("#f8f9fb", "#292E39")(props),
          },
          "*::placeholder": {
            color: mode("gray.400", "whiteAlpha.400")(props),
          },
        }),
      },
      components: {
        Input,
        Button,
        Container,
        Select,
      },
    },
    withDefaultColorScheme({ colorScheme: "blue" })
  );
  