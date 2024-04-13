import { useState } from "react";
import "./App.css";

// html 코드를 작성하려면 return() 안에 작성
// css를 사용하려면 위에 보이는 것처럼 import
// class -> className : 자바스크립트에 이미 class 라는 명령어 존재
// - 표시는 뺄셈으로 취급하기 때문에 대문자로 작성
// 변수를 사용할때는 {} 로 이용
// style은 object 자료형으로 작성 {키: 값, 키: 값}
//return() 안에 가장 바깥에는 하나의 태그만

//리액트 : 변수가 바뀌면 화면이 바뀌는 state(웹페이지를 다시 불러올 필요가 없음)
// import React, {useState} from 'react'
// 리액트는 화면에 보여줄 값을 '변수'에 보관하지 않고 'state'에 보관
// 변수는 값이 변경되어도 화면에 반영되지 않지만, useState라는 것을
//사용하면 값이 바뀌면 화면도 따라서 바뀜 (데이터바인딩)
// 따라서, 변경될만한 값은 useState로 보관하고, 변경이 안될 값은 변수에 보관

function App() {
  // 여기에 자바스크립트 작성 가능
  let 변수 = "블로그 글 목록";

  let [value, setValue] = useState("서버에서 실시간으로 받는 값");
  let [title, setTitle] = useState(["이궈궈던", "뀨우", "킹덤", "웹툰"]);
  let [dateTime, setDateTime] = useState([
    "2024.04.13",
    "2024.03.12",
    "2024.01.02",
    "2024.01.30",
  ]);
  let [score, setScore] = useState([0, 0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [curIdx, setCurIdx] = useState(0); // 모달창이 열릴 때 몇번째 항목이 열리는지 구분

  let onClickHandler = (e, idx) => {
    e.stopPropagation();
    //자바스크립트에서 배열요소를 수정하려면 분해했다가 변경해야함
    setScore(() => {
      let src = [...score];
      src[idx] += 1;
      return src;
    });
  };

  let clickShowText = () => {
    modal === false ? setModal(true) : setModal(false);
  };

  //return 안에는 html 코드
  return (
    <div className="App">
      <div className="black-nav">
        <h4>{value}</h4>
      </div>

      {
        /* 
      리액트에서 {}안의 반복문은 for가 아니라 map으로 한다
      왜냐하면 for(){} 에서 중괄호가 중복되기 때문에 map으로 제공
      배열.map()

      list 클래스를 4번 반복
      //map 가장 바깥 태그에 구분할 수 있는 key를 적어주기
      */

        title.map(function (el, idx) {
          let icon = ["🤖", "😄", "😁", "🌱"];
          return (
            <>
              <div className="list" key={idx}>
                <h4
                  onClick={() => {
                    setCurIdx(idx);
                    clickShowText();
                  }}
                >
                  {el}{" "}
                  <span onClick={(e) => onClickHandler(e, idx)}>
                    {icon[idx]}
                  </span>
                  {score[idx]}
                </h4>
                <p>{dateTime[idx]} 작성</p>
              </div>
            </>
          );
        })
      }

      {/* 
      분할해서 쪼갠 코드 
      
      modal값이 false면 안보이게, true면 보이게
      리액트 {} 안에서는 if와 for가 사용이 불가능 => {} 중복때문에
      if는 삼항연산자로,
      for는 map으로 사용
      삼항연산자란?
      조건식 ? 맞으면-실행할 코드 : 틀리면-실행할 코드

      다른 컴포넌트에 값을 넘겨줄때는 props 라는 것을 사용
      */}
      {modal === true ? (
        <Modal idx={curIdx} title={title} date={dateTime} />
      ) : null}
    </div>
  );
}

// Modal 컴포넌트
// 코드가 길어지면 별도의 함수로 분리해서 '컴포넌트' 로 만들어준다
// return() 안에 html 태그를 작성
// 사용하고자 하는 곳에 <함수명 />
function Modal(props) {
  return (
    <>
      {/* 부분만 떼고 싶다 ==> 컴포넌트로 만든다. */}
      <div className="modal">
        <h2>{props.title[props.idx]}</h2>
        <p>{props.date[props.idx]}</p>
        <p>상세 내용</p>
      </div>
    </>
  );
}

export default App;
