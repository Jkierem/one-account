import { useDispatch } from 'react-redux'
import { usePathSelector } from 'redux-utility'
import { setView } from '../../redux/view'
import { Views, verifyView as verify } from '../common/Views'

const useViewManager = () => {
  const dispatch = useDispatch()
  const view = usePathSelector("view")
  const changeView = (v) => {
    if (typeof v === "function") {
      dispatch(setView(verify(v(view))))
    } else {
      dispatch(setView(verify(v)))
    }
  }

  return {
    view: Views[view],
    changeView,
  }
}

export default useViewManager
