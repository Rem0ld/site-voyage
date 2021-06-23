/* eslint-disable jsx-a11y/click-events-have-key-events */
import BackIcon from "components/Elements/IconsComponents/BackIcon";
import { motion } from "framer-motion";
import React, { ReactElement, useEffect, useState } from "react";
import { Picture, Review } from "types";
import Comment from "../CarouselComments/Comment";

interface AppProperties {
  list: Picture[] | undefined;
}

export default function CarouselPictures({
  list,
}: AppProperties): ReactElement {
  const [indexCarousel, setIndexCarousel] = useState<number>(0);
  const [carouselItems, setCarouselItems] = useState<Review[]>([]);
  const [displayCarousel, setDisplayCarousel] = useState<Review[]>();
  const numberDisplayedItems = 4;

  // useEffect(() => {
  //   if (list) setCarouselItems(list);
  // }, [list]);

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
        : previousState + numberDisplayedItems
    );
  };
  const decrement = () => {
    setIndexCarousel((previousState) =>
      previousState <= 0
        ? carouselItems.length - 1
        : previousState - numberDisplayedItems
    );
  };

  return carouselItems ? (
    <>
      <div
        tabIndex={0}
        role="button"
        onClick={decrement}
        className="absolute left-0 w-6"
      >
        <BackIcon />
      </div>
      <motion.div className="flex space-x-4">
        {displayCarousel?.map((element: Review) => (
          <Comment key={element.id} comment={element} />
        ))}
      </motion.div>
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
    <span>No Pictures yet...</span>
  );
}
