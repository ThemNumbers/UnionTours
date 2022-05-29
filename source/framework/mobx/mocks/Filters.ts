import { FilterGroup } from '../interfaces/Filters'

export const initialFilters: Array<FilterGroup> = [
  {
    title: 'Тип',
    key: 'type',
    filters: [
      { value: 1, title: 'Индивидуальные', key: '611a815857f8c10019f8c8e9' },
      { value: 1, title: 'Групповые', key: '611a817f57f8c10019f8c8eb' },
      { value: 1, title: 'Автобусные ', key: '611a7c8257f8c10019f8c8cd' },
      { value: 1, title: 'Обзорные', key: '611a7cd057f8c10019f8c8d1' },
      { value: 1, title: 'Событийные', key: '611a822d57f8c10019f8c8ef' },
      { value: 1, title: 'Тематические', key: '611a7cf557f8c10019f8c8d3' },
      { value: 1, title: 'Исторические', key: '611a7d6d57f8c10019f8c8d7' },
      { value: 1, title: 'Гастрономические', key: '611a7d1957f8c10019f8c8d5' },
      { value: 1, title: 'Авторские', key: '611a7ea157f8c10019f8c8df' },
      { value: 1, title: 'Этнотуры', key: '611a825557f8c10019f8c8f1' },
      { value: 1, title: 'Экотуры', key: '611a827e57f8c10019f8c8f3' },
    ],
  },
  {
    title: 'Продолжительность',
    key: 'duration',
    filters: [
      { value: 1, title: '2 ночи ', key: '611a852c57f8c10019f8c907' },
      { value: 1, title: '3 ночи', key: '611a854e57f8c10019f8c909' },
      { value: 1, title: '4 ночи ', key: '611a857357f8c10019f8c90b' },
      { value: 1, title: '5 ночей', key: '611a859b57f8c10019f8c90d' },
      { value: 1, title: '6 ночей', key: '611a85bf57f8c10019f8c90f' },
      { value: 1, title: '7 ночей', key: '611a85e957f8c10019f8c911' },
      { value: 1, title: 'Более 7 ночей', key: '611a860757f8c10019f8c913' },
    ],
  },
  {
    title: 'Особенности',
    key: 'special',
    filters: [
      { value: 1, title: 'С перелетом ', key: '611a836957f8c10019f8c8fa' },
      { value: 1, title: 'С проживанием ', key: '6123b4a1020892001197bb4d' },
      { value: 1, title: 'С питанием ', key: '611a842657f8c10019f8c8ff' },
      { value: 1, title: 'С детьми', key: '611a6d2257f8c10019f8c8aa' },
      { value: 1, title: 'Туры выходного дня', key: '611a84db57f8c10019f8c903' },
      { value: 1, title: 'Недорогие туры ', key: '611a84fe57f8c10019f8c905' },
    ],
  },
]
