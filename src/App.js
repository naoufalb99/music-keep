import styled from "styled-components";
import MusicPlayer from "components/MusicPlayer";
import React, { useCallback, useEffect, useRef, useState } from "react";
import usePosition from "hooks/usePosition";

const PlayerBackground = styled.div`
  background: linear-gradient(to top left, #1d1f27, #111);
  max-width: 500px;
  width: 100%;
  border-radius: 30px;
  text-align: center;
  padding: 2rem 0;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
  color: #fff;
`;

const Thumb = styled.img.attrs(() => ({
  src: "https://picsum.photos/200/300",
}))`
  display: block;
  margin: 0 auto;
  object-fit: cover;
  border-radius: 30px;
  width: calc(100% - 80px);
  aspect-ratio: 16/9;
  transition: transform 280ms;
  &:hover {
    transform: scale(1.02);
  }
`;
const MusicTitle = styled(Title)`
  margin-bottom: 0.6rem;
  margin-top: 2rem;
`;
const MusicArtist = styled(Title)`
  margin-bottom: 1.3rem;
  color: rgba(240, 240, 240, 0.6);
  font-size: 0.8rem;
`;

const MusicTimeLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;
const MusicTimeLineSlider = styled.div`
  position: relative;
  margin: 0 2rem;
  width: calc(100% - 120px - 4rem);
  height: 4px;
  border-radius: 2rem;
  background-color: rgba(255, 255, 255, 0.16);
  &::after {
    content: "";
    position: absolute;
    --size: 1rem;
    top: calc(50%);
    margin-top: calc(var(--size) / -2);
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    border: calc(var(--size) / 4) solid #fff;
    box-sizing: border-box;
  }
  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    width: 50%;
    background: #fff;
  }
`;

const Controllers = styled.div``;

function PlayerOld() {
  return (
    <PlayerBackground>
      <Title>Now Playing</Title>
      <Thumb />
      <MusicTitle>The Adventure</MusicTitle>
      <MusicArtist>Angles & Airwaves</MusicArtist>
      <MusicTimeLine>
        <div>2:40</div>
        <MusicTimeLineSlider />
        <div>3:45</div>
      </MusicTimeLine>
      <Controllers></Controllers>
    </PlayerBackground>
  );
}

function Player({ title, artist }) {
  return (
    <div className="group bg-gradient-to-tl from-gray-900 to-black p-10 rounded-3xl">
      <div className="text-white text-center font-bold mb-8">Now Playing</div>
      <img
        className="block rounded-3xl transform group-hover:scale-105 transition ease-in-out duration-200"
        width={500}
        src="https://picsum.photos/470/250"
        alt="The Adventur"
      />
      <div className="mt-10">
        <div className="text-white text-center font-bold text-lg">
          The Adventure
        </div>
        <div className="text-gray-500 text-center font-bold text-sm mt-3">
          Angles & Airwaves
        </div>
      </div>
      <div className="mt-7">
        <PlayerSlider />
      </div>
    </div>
  );
}

function PlayerSlider() {
  // const [position, setPosition] = useState(80);
  // const ref = useRef();
  // let activateTimeout = useRef()
  // const [active, setActive] = useState(false);
  // const [x, setX] = useState(0);
  // const [offsetWidth, setOffsetWidth] = useState(0);

  // function setActivateToFalse() {
  //     if(activateTimeout.current) {
  //           window.clearTimeout(activateTimeout.current)
  //     }
  //   const t = window.setTimeout(() => {
  //       console.log('timeout')
  //       setActive(false);
  //     }, 1000)
  //     activateTimeout.current = t;
  //     console.log(t, activateTimeout)
  // }
  //   function setPositionProxy(value) {
  //       if(value < 0) value = 0;
  //       else if(value > 100) value = 100;
  //       setPosition(value);
  //       if([0, 100].includes(value)) setActivateToFalse(false)
  //   }
  // function handlerMouseDown(e) {
  //   setX(e.clientX);
  //   setActive(true);
  // }
  // function handleMouseUp(e) {
  //   setX(e.clientX);
  //   setActive(false);
  // }
  // const handleMouseMove = useCallback(
  //   (e) => {
  //     if (active) {
  //         if(activateTimeout.current) {
  //           console.log(activateTimeout)
  //           window.clearTimeout(activateTimeout);
  //           activateTimeout.current = undefined;
  //         }
  //       setX(e.clientX);
  //       setPositionProxy(position + (e.clientX - x) / (offsetWidth / 100));
  //     }
  //   },
  //   [active, position, x, offsetWidth, activateTimeout, setPositionProxy]
  // );

  // useEffect(() => {
  //   setOffsetWidth(ref.current.offsetWidth);
  // }, [ref]);

  // useEffect(() => {
  //   document.addEventListener("mousemove", handleMouseMove);
  //   document.addEventListener("mouseup", handleMouseUp);
  //   return () => {
  //     document.removeEventListener("mousemove", handleMouseMove);
  //     document.removeEventListener("mouseup", handleMouseUp);
  //   };
  // }, [handleMouseMove]);

  const {state: {position}, cursorRef, onMouseDownHandler} = usePosition(100);

  return (
    <div className="h-1 bg-gray-700 relative" ref={cursorRef}>
      <div
        className="w-4 h-4 bg-white rounded-full cursor-pointer absolute top-1/2 -mt-2"
        style={{
          left: `${position}px`,
        }}
        onMouseDown={onMouseDownHandler}
      ></div>
      <div
        className="w-5/12 bg-white rounded-full absolute top-0 bottom-0 left-0"
        style={{
          width: `${position}px`,
        }}
        // onMouseDown={() => console.log('click')}
      ></div>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 20vh;
  `;

function App() {
  return (
    <Container className="bg-gradient-to-tr from-gray-800 to-gray-900">
      {/* <PlayerOld /> */}
      <Player />
    </Container>
  );
}

export default App;
