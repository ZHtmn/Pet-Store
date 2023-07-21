export default function calculatePriceAndCount(state) {
  //!!!!
  state.totalPrice = state.items.reduce((acc, el) => acc += (el.price - (el.price * el.discount / 100)) * el.count, 0)
  //????????????
  state.totalCount = state.items.reduce((acc, el) => acc += el.count, 0)
}