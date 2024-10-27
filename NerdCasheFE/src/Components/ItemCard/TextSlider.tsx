import React, { FunctionComponent, useEffect, useRef } from "react";
import TextSliderStyles from "./TextSlider.module.css";
import gsap from "gsap";
interface ITextSlider {
  text: string | null;
}

export const TextSlider: FunctionComponent<ITextSlider> = ({ text }) => {
  let xPercent = 0;
  const textRef = useRef<null | HTMLHeadingElement>(null);
  const divRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (isTextOverflowing()) {
      requestAnimationFrame(animation);
    }
  }, [textRef]);
  function isTextOverflowing() {
    return divRef.current != undefined &&
      textRef.current != undefined &&
      textRef.current.clientWidth > divRef.current.clientWidth
      ? true
      : false;
  }
  const animation = () => {
    console.log(xPercent);
    if (textRef.current != undefined && xPercent <= -100) {
      xPercent = 110;
    }
    if (textRef.current != undefined) {
      gsap.set(textRef.current, { xPercent: xPercent });
    }
    xPercent += 0.175 * -1;
    requestAnimationFrame(animation);
  };

  return (
    <div ref={divRef} className={TextSliderStyles.sliderContainer}>
      <div className={TextSliderStyles.slider}>
        <h1
          ref={textRef}
          className={
            isTextOverflowing()
              ? TextSliderStyles.animationText
              : TextSliderStyles.noAnimationText
          }
        >
          {text}
        </h1>
        {/* <h1 ref={textRef2}>{text}</h1> */}
      </div>
    </div>
  );
};
