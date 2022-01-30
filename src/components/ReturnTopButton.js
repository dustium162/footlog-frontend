import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

const ReturnTopButton = () => {
  const [isButtonActive, setIsButtonActive] = useState(false)

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollWindow)
    return () => {
      window.removeEventListener('scroll', scrollWindow)
    }
  }, [])

  const scrollWindow = () => {
    const top = 100  //ボタンを表示させたい位置
    let scroll = 0
    scroll = window.scrollY
    if (top <= scroll) {
      setIsButtonActive(true)
    } else {
      setIsButtonActive(false)
    }
  }

  const normalStyle = {
    opacity: 0,
    transition: '0.5s',
    pointerEvents: 'none'
  }
  const activeStyle = {
    opacity: 0.8,
    transition: '0.5s'
  }
  const style = isButtonActive ? activeStyle : normalStyle;

  return (
    <div id="page_top" style={style}>
      <a href="#" className="text-center" onClick={returnTop}>
        <FontAwesomeIcon className="fa-lg text-white" icon={faAngleDoubleUp} style={{marginTop: '12px'}}></FontAwesomeIcon>
      </a>
    </div>
  )
}

export default ReturnTopButton;
