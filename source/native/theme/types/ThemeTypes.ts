export interface ColorTheme {
  blue_1: string
  blue_2: string
  blue_3: string
  blue_4: string
  blue_5: string
  blue_6: string
  blue_7: string
  blue_8: string
  blue_9: string

  gray_1: string
  gray_2: string
  gray_3: string
  gray_4: string
  gray_5: string
  gray_6: string
  gray_7: string
  gray_8: string
  gray_9: string

  red_1: string
  red_2: string
  red_3: string
  red_4: string
  red_5: string
  red_6: string
  red_7: string
  red_8: string
  red_9: string

  gold_1: string
  gold_2: string
  gold_3: string
  gold_4: string
  gold_5: string
  gold_6: string
  gold_7: string
  gold_8: string
  gold_9: string

  yellow_1: string
  yellow_2: string
  yellow_3: string
  yellow_4: string
  yellow_5: string
  yellow_6: string
  yellow_7: string
  yellow_8: string
  yellow_9: string

  green_1: string
  green_2: string
  green_3: string
  green_4: string
  green_5: string
  green_6: string
  green_7: string
  green_8: string
  green_9: string

  cyan_1: string
  cyan_2: string
  cyan_3: string
  cyan_4: string
  cyan_5: string
  cyan_6: string
  cyan_7: string
  cyan_8: string
  cyan_9: string

  geekblue_1: string
  geekblue_2: string
  geekblue_3: string
  geekblue_4: string
  geekblue_5: string
  geekblue_6: string
  geekblue_7: string
  geekblue_8: string
  geekblue_9: string

  purple_1: string
  purple_2: string
  purple_3: string
  purple_4: string
  purple_5: string
  purple_6: string
  purple_7: string
  purple_8: string
  purple_9: string

  volcano_1: string
  volcano_2: string
  volcano_3: string
  volcano_4: string
  volcano_5: string
  volcano_6: string
  volcano_7: string
  volcano_8: string
  volcano_9: string
}

export interface SpacingTheme {
  half: number
  base: number
  double: number
  offset: number
}

export interface Theme {
  id: string
  colors: ColorTheme
  spacings: SpacingTheme
}
