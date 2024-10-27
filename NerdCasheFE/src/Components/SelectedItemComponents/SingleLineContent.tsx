import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import SingleLineContentStyles from "./SingleLineContent.module.css";
export const enum ContentType {
  TITLE,
  CONTRIBUTOR,
}
interface ISingleLineContent {
  content: string | null;
  type: ContentType;
}
export const SingleLineContent: FunctionComponent<ISingleLineContent> = ({
  content,
  type,
}) => {
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const contentTextRef = useRef<HTMLHeadingElement>(null);
  const [contentTextWidth, setContentTextWidth] = useState(0);
  const [contentContainerWidth, setContentContainerWidth] = useState(0);

  useEffect(() => {
    if (contentContainerRef == null || contentTextRef == null) return;
    setContentContainerWidth(contentContainerRef.current!.clientWidth);
    setContentTextWidth(contentTextRef.current!.clientWidth);
  }, [content]);

  return (
    <div
      className={`${SingleLineContentStyles.contentContainer}`}
      ref={contentContainerRef}
    >
      <div
        className={`${
          contentTextWidth <= contentContainerWidth
            ? SingleLineContentStyles.centeredContent
            : ""
        }`}
      >
        <h1
          ref={contentTextRef}
          className={`${
            contentTextWidth > contentContainerWidth
              ? SingleLineContentStyles.scrollingText
              : ""
          } ${
            type == ContentType.TITLE
              ? SingleLineContentStyles.titleText
              : SingleLineContentStyles.contributorText
          }`}
        >
          {content}
        </h1>
      </div>
    </div>
  );
};
