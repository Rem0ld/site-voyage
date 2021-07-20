/* eslint-disable jsx-a11y/click-events-have-key-events */
import BackIcon from "components/Elements/IconsComponents/BackIcon";
import React, { ReactElement, useEffect, useState } from "react";
import { Review } from "types";
import Comment from "./Comment";

interface AppProperties {
  list: Review[] | undefined;
}

export default function CarouselComments({
  list,
}: AppProperties): ReactElement {
  const [indexCarousel, setIndexCarousel] = useState<number>(0);
  const [carouselItems, setCarouselItems] = useState<Review[]>([]);
  const [displayCarousel, setDisplayCarousel] = useState<Review[]>();
  const numberDisplayedItems = 4;

  useEffect(() => {
    if (list) setCarouselItems(list);
  }, [list]);

  useEffect(() => {
    if (carouselItems) {
      setDisplayCarousel(
        carouselItems.slice(indexCarousel, indexCarousel + numberDisplayedItems)
      );
    }
  }, [carouselItems, indexCarousel]);

  const increment = () => {
    setIndexCarousel((previousState) =>
      previousState >= carouselItems.length - 1
        ? 0
        : previousState + numberDisplayedItems > carouselItems.length - 1
        ? 0
        : previousState + numberDisplayedItems
    );
  };
  const decrement = () => {
    setIndexCarousel((previousState) =>
      previousState <= 0
        ? carouselItems.length - 1
        : previousState - numberDisplayedItems < 0
        ? carouselItems.length - 1
        : previousState - numberDisplayedItems
    );
  };

  return carouselItems.length > 0 ? (
    <>
      <div
        tabIndex={0}
        role="button"
        onClick={decrement}
        className="absolute left-0 w-6"
      >
        <BackIcon />
      </div>
      <div className="flex space-x-4">
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
  ) : (
    <span>No Comments yet... And not in use at the moment, sorry</span>
  );
}
