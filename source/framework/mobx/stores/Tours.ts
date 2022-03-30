import { observable, makeObservable, action, configure } from 'mobx'
import { RootStore } from '.'
import { callApi } from '../../services/ApiService'
import { TourItem } from '../interfaces/Tours'

interface City {
  dataId: string
  dataDepartureId: string
  title: string
}

const cities: City[] = [
  { dataId: '1', dataDepartureId: '2', title: 'Москва' },
  { dataId: '2', dataDepartureId: '1', title: 'Санкт-Петербург' },
  { dataId: '82', dataDepartureId: '90', title: 'Абакан' },
  { dataId: '94', dataDepartureId: '88', title: 'Анадырь' },
  { dataId: '55', dataDepartureId: '8', title: 'Архангельск' },
  { dataId: '42', dataDepartureId: '2', title: 'Астрахань' },
  { dataId: '106', dataDepartureId: '2', title: 'Балашиха' },
  { dataId: '31', dataDepartureId: '51', title: 'Барнаул' },
  { dataId: '53', dataDepartureId: '13', title: 'Белгород' },
  { dataId: '91', dataDepartureId: '88', title: 'Биробиджан' },
  { dataId: '81', dataDepartureId: '15', title: 'Благовещенск' },
  { dataId: '51', dataDepartureId: '18', title: 'Брянск' },
  { dataId: '80', dataDepartureId: '1', title: 'Великий Новгород' },
  { dataId: '131', dataDepartureId: '2', title: 'Видное' },
  { dataId: '34', dataDepartureId: '19', title: 'Владивосток' },
  { dataId: '63', dataDepartureId: '20', title: 'Владикавказ' },
  { dataId: '3', dataDepartureId: '2', title: 'Владимир' },
  { dataId: '7', dataDepartureId: '21', title: 'Волгоград' },
  { dataId: '62', dataDepartureId: '2', title: 'Вологда' },
  { dataId: '9', dataDepartureId: '2', title: 'Воронеж' },
  { dataId: '96', dataDepartureId: '12', title: 'Горно-Алтайск' },
  { dataId: '68', dataDepartureId: '2', title: 'Грозный' },
  { dataId: '129', dataDepartureId: '50', title: 'Дзержинск' },
  { dataId: '115', dataDepartureId: '2', title: 'Дзержинский' },
  { dataId: '110', dataDepartureId: '2', title: 'Долгопрудный' },
  { dataId: '103', dataDepartureId: '2', title: 'Домодедово' },
  { dataId: '126', dataDepartureId: '2', title: 'Дубна' },
  { dataId: '21', dataDepartureId: '25', title: 'Екатеринбург' },
  { dataId: '113', dataDepartureId: '2', title: 'Железнодорожный' },
  { dataId: '123', dataDepartureId: '2', title: 'Жуковский' },
  { dataId: '18', dataDepartureId: '2', title: 'Зеленоград' },
  { dataId: '50', dataDepartureId: '2', title: 'Иваново' },
  { dataId: '14', dataDepartureId: '61', title: 'Ижевск' },
  { dataId: '101', dataDepartureId: '25', title: 'Ирбит' },
  { dataId: '33', dataDepartureId: '28', title: 'Иркутск' },
  { dataId: '73', dataDepartureId: '29', title: 'Йошкар-Ола' },
  { dataId: '22', dataDepartureId: '29', title: 'Казань' },
  { dataId: '45', dataDepartureId: '30', title: 'Калининград' },
  { dataId: '57', dataDepartureId: '2', title: 'Калуга' },
  { dataId: '41', dataDepartureId: '32', title: 'Кемерово' },
  { dataId: '13', dataDepartureId: '29', title: 'Киров' },
  { dataId: '130', dataDepartureId: '2', title: 'Клин' },
  { dataId: '109', dataDepartureId: '2', title: 'Коломна' },
  { dataId: '75', dataDepartureId: '80', title: 'Комсомольск-на-Амуре' },
  { dataId: '107', dataDepartureId: '2', title: 'Королёв' },
  { dataId: '70', dataDepartureId: '2', title: 'Кострома' },
  { dataId: '17', dataDepartureId: '2', title: 'Красногорск' },
  { dataId: '28', dataDepartureId: '36', title: 'Краснодар' },
  { dataId: '26', dataDepartureId: '37', title: 'Красноярск' },
  { dataId: '59', dataDepartureId: '25', title: 'Курган' },
  { dataId: '46', dataDepartureId: '13', title: 'Курск' },
  { dataId: '88', dataDepartureId: '28', title: 'Кызыл' },
  { dataId: '44', dataDepartureId: '2', title: 'Липецк' },
  { dataId: '118', dataDepartureId: '2', title: 'Люберцы' },
  { dataId: '90', dataDepartureId: '42', title: 'Магадан' },
  { dataId: '84', dataDepartureId: '20', title: 'Магас' },
  { dataId: '49', dataDepartureId: '43', title: 'Магнитогорск' },
  { dataId: '83', dataDepartureId: '36', title: 'Майкоп' },
  { dataId: '37', dataDepartureId: '36', title: 'Махачкала' },
  { dataId: '99', dataDepartureId: '44', title: 'Минеральные Воды' },
  { dataId: '65', dataDepartureId: '46', title: 'Мурманск' },
  { dataId: '102', dataDepartureId: '2', title: 'Мытищи' },
  { dataId: '43', dataDepartureId: '29', title: 'Набережные Челны' },
  { dataId: '85', dataDepartureId: '47', title: 'Нальчик' },
  { dataId: '127', dataDepartureId: '2', title: 'Наро-Фоминск' },
  { dataId: '92', dataDepartureId: '8', title: 'Нарьян-Мар' },
  { dataId: '72', dataDepartureId: '48', title: 'Нижневартовск' },
  { dataId: '6', dataDepartureId: '50', title: 'Нижний Новгород' },
  { dataId: '54', dataDepartureId: '25', title: 'Нижний Тагил' },
  { dataId: '40', dataDepartureId: '51', title: 'Новокузнецк' },
  { dataId: '74', dataDepartureId: '67', title: 'Новороссийск' },
  { dataId: '20', dataDepartureId: '53', title: 'Новосибирск' },
  { dataId: '100', dataDepartureId: '25', title: 'Новоуральск' },
  { dataId: '128', dataDepartureId: '68', title: 'Новый Уренгой' },
  { dataId: '125', dataDepartureId: '2', title: 'Ногинск' },
  { dataId: '112', dataDepartureId: '2', title: 'Обнинск' },
  { dataId: '105', dataDepartureId: '2', title: 'Одинцово' },
  { dataId: '24', dataDepartureId: '56', title: 'Омск' },
  { dataId: '38', dataDepartureId: '57', title: 'Оренбург' },
  { dataId: '121', dataDepartureId: '2', title: 'Орехово-Зуево' },
  { dataId: '60', dataDepartureId: '18', title: 'Орёл' },
  { dataId: '16', dataDepartureId: '2', title: 'Пенза' },
  { dataId: '27', dataDepartureId: '61', title: 'Пермь' },
  { dataId: '71', dataDepartureId: '1', title: 'Петрозаводск' },
  { dataId: '89', dataDepartureId: '62', title: 'Петропавловск-Камчатский' },
  { dataId: '116', dataDepartureId: '2', title: 'Подольск' },
  { dataId: '79', dataDepartureId: '2', title: 'asa' },
  { dataId: '111', dataDepartureId: '2', title: 'Пушкино' },
  { dataId: '122', dataDepartureId: '2', title: 'Раменское' },
  { dataId: '108', dataDepartureId: '2', title: 'Реутов' },
  { dataId: '11', dataDepartureId: '63', title: 'Ростов-на-Дону' },
  { dataId: '12', dataDepartureId: '2', title: 'Рязань' },
  { dataId: '95', dataDepartureId: '81', title: 'Салехард' },
  { dataId: '10', dataDepartureId: '64', title: 'Самара' },
  { dataId: '64', dataDepartureId: '60', title: 'Саранск' },
  { dataId: '8', dataDepartureId: '65', title: 'Саратов' },
  { dataId: '98', dataDepartureId: '66', title: 'Севастополь' },
  { dataId: '124', dataDepartureId: '2', title: 'Сергиев Посад' },
  { dataId: '120', dataDepartureId: '2', title: 'Серпухов' },
  { dataId: '97', dataDepartureId: '66', title: 'Симферополь' },
  { dataId: '4', dataDepartureId: '2', title: 'Смоленск' },
  { dataId: '52', dataDepartureId: '67', title: 'Сочи' },
  { dataId: '48', dataDepartureId: '93', title: 'Ставрополь' },
  { dataId: '69', dataDepartureId: '79', title: 'Стерлитамак' },
  { dataId: '58', dataDepartureId: '68', title: 'Сургут' },
  { dataId: '78', dataDepartureId: '70', title: 'Сыктывкар' },
  { dataId: '76', dataDepartureId: '63', title: 'Таганрог' },
  { dataId: '67', dataDepartureId: '22', title: 'Тамбов' },
  { dataId: '19', dataDepartureId: '2', title: 'Тверь' },
  { dataId: '29', dataDepartureId: '64', title: 'Тольятти' },
  { dataId: '39', dataDepartureId: '72', title: 'Томск' },
  { dataId: '104', dataDepartureId: '2', title: 'Троицк' },
  { dataId: '5', dataDepartureId: '2', title: 'Тула' },
  { dataId: '30', dataDepartureId: '74', title: 'Тюмень' },
  { dataId: '47', dataDepartureId: '75', title: 'Улан-Удэ' },
  { dataId: '32', dataDepartureId: '64', title: 'Ульяновск' },
  { dataId: '25', dataDepartureId: '79', title: 'Уфа' },
  { dataId: '36', dataDepartureId: '80', title: 'Хабаровск' },
  { dataId: '93', dataDepartureId: '81', title: 'Ханты-Мансийск' },
  { dataId: '117', dataDepartureId: '2', title: 'Химки' },
  { dataId: '15', dataDepartureId: '29', title: 'Чебоксары' },
  { dataId: '23', dataDepartureId: '84', title: 'Челябинск' },
  { dataId: '61', dataDepartureId: '2', title: 'Череповец' },
  { dataId: '87', dataDepartureId: '44', title: 'Черкесск' },
  { dataId: '56', dataDepartureId: '85', title: 'Чита' },
  { dataId: '114', dataDepartureId: '2', title: 'Щёлково' },
  { dataId: '119', dataDepartureId: '2', title: 'Электросталь' },
  { dataId: '86', dataDepartureId: '93', title: 'Элиста' },
  { dataId: '77', dataDepartureId: '87', title: 'Южно-Сахалинск' },
  { dataId: '66', dataDepartureId: '88', title: 'Якутск' },
  { dataId: '35', dataDepartureId: '2', title: 'Ярославль' },
]

class ToursStore {
  private root: RootStore
  public tourList: Array<TourItem> = []

  constructor(root: RootStore) {
    this.root = root
    makeObservable(this, {
      tourList: observable,
      getToursList: action,
    })
    configure({
      enforceActions: 'never',
    })
  }

  public getToursList = () => {
    console.log('test')
    callApi<Array<TourItem>>({ endpoint: '/tours' }).then((res) => {
      this.tourList = res.data
    })
  }
}

export { ToursStore }
