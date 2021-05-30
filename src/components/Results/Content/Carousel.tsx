/* eslint-disable jsx-a11y/click-events-have-key-events */
import BackIcon from "components/elements/IconsComponents/BackIcon";
import React, { ReactElement, useEffect, useState } from "react";
import { Review } from "types";
import Comment from "./Comment";

interface AppProperties {
  list: Review[];
}

export default function Carousel({ list }: AppProperties): ReactElement {
  const [indexCarousel, setIndexCarousel] = useState<number>(0);
  const [carouselItems, setCarouselItems] = useState<Review[]>([]);
  const [displayCarousel, setDisplayCarousel] = useState<Review[]>();

  useEffect(() => {
    setCarouselItems(list);
  }, [list]);

  useEffect(() => {
    if (carouselItems) {
      console.log("indexCarousel", indexCarousel);
      setDisplayCarousel(carouselItems.slice(indexCarousel, indexCarousel + 3));
    }
  }, [carouselItems, indexCarousel]);

  const increment = () => {
    setIndexCarousel((previousState) =>
      previousState >= carouselItems.length - 1 ? 0 : previousState + 3
    );
  };
  const decrement = () => {
    setIndexCarousel((previousState) =>
      previousState <= 0 ? carouselItems.length - 1 : previousState - 3
    );
  };

  return (
    <>
      <div
        tabIndex={0}
        role="button"
        onClick={decrement}
        className="absolute left-0 w-6"
      >
        <BackIcon />
      </div>
      <div className="flex space-x-1">
        {displayCarousel?.map((element: Review) => (
          <Comment key={element.id} comment={element} />
        ))}
      </div>
      <div
        tabIndex={0}
        role="button"
        onClick={increment}
        className="absolute right-0 w-6 rotate-180 transform-gpu"
      >
        <BackIcon />
      </div>
    </>
  );
}
