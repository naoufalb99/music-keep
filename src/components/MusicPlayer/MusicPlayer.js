import usePosition from "hooks/usePosition";

function MusicPlayer({ title, artist }) {
  return (
    <div className="group bg-gradient-to-tl from-gray-900 to-black p-10 rounded-3xl">
      <div className="text-white text-center font-bold mb-8">Now Playing</div>
      <img
        className="block rounded-3xl transform group-hover:scale-105 transition ease-in-out duration-200"
        src="https://picsum.photos/300/160"
        alt="The Adventur"
        width={300}
        height={160}
      />
      <div className="mt-8">
        <div className="text-white text-center font-bold text-lg">{title}</div>
        <div className="text-gray-500 text-center font-bold text-sm mt-3">{artist}</div>
      </div>
      <div className="mt-7">
        <PlayerSlider />
      </div>
    </div>
  );
}

function PlayerSlider() {
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

export default MusicPlayer;