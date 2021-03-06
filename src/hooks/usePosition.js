import * as React from "react";
import { debounce } from "lodash";

function positionReducer(state, action) {
  switch (action.type) {
    case "INIT":
      const { maxPosition, clientX } = action;
      return { ...state, maxPosition, clientX };
    case "MOUSE_DOWN":
      return { ...state, active: true };
      case "MOUSE_UP":
        return { ...state, active: false };
    case "UPDATE_POSITION":
      return { ...state, position: action.position };
    default:
      return state;
  }
}

export default function usePosition(initialPosition) {
  const cursorRef = React.useRef();
  const [state, dispatch] = React.useReducer(positionReducer, {
    position: initialPosition,
    active: false
  });

  const { clientX, maxPosition, active } = state;

  React.useEffect(() => {
    const { offsetWidth, offsetLeft } = cursorRef.current;
    dispatch({
      type: "INIT",
      maxPosition: offsetWidth,
      clientX: offsetLeft + 8,
    });
  }, []);

  React.useEffect(() => {
    const eventCallback = (e) => {
      const calculatedPosition = Math.min(
        Math.max(e.clientX - clientX, 0),
        maxPosition
      );
      if (!active) return;
      dispatch({ type: "UPDATE_POSITION", position: calculatedPosition });
    };
    const debouncedEventCallback = debounce(eventCallback, 6);
    window.addEventListener("mousemove", debouncedEventCallback);
    return () => {
      window.removeEventListener("mousemove", debouncedEventCallback);
    };
  }, [clientX, maxPosition, active]);

  React.useEffect(() => {
    const onMouseUp = () => dispatch({type: "MOUSE_UP"});
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseUp);
    };
  }, []);

  const onMouseDownHandler = () => {
    dispatch({ type: "MOUSE_DOWN" });
  };

  return { cursorRef, state, onMouseDownHandler };
}
