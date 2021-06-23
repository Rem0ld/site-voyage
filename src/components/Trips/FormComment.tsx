/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import createReview from "api/server/reviewRoutes";
import Button from "components/Elements/Button";
import StarEmpty from "components/Elements/IconsComponents/StarEmpty";
import StarFilled from "components/Elements/IconsComponents/StarFilled";
import ctl from "helpers/ctl";
import React, { ReactElement, useMemo, useState } from "react";
import CrossIcon from "../Elements/IconsComponents/CrossIcon";

interface AppProperties {
  closePopup: () => void;
  destination: string;
}

const container = ctl(`
absolute 
bottom-10 
flex 
flex-col 
w-96 
h-auto 
p-4 
bg-white 
shadow-md 
rounded-md 
border 
border-gray-200
`);

export default function FormComment({
  closePopup,
  destination,
}: AppProperties): ReactElement {
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(0);
  const stars: any[] = Array.from({ length: 5 });

  const displayStars = useMemo(
    () =>
      stars.map((element, index) => (
        <span
          key={`star-${index}`}
          role="button"
          tabIndex={-1}
          onClick={() => {
            setRate(index);
          }}
        >
          {rate + 1 <= index ? (
            <StarEmpty size={20} />
          ) : (
            <StarFilled size={20} />
          )}
        </span>
      )),
    [rate, stars]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (comment.length > 0) {
      // Because array is starting at 0 we add 1
      createReview({ comment, score: rate + 1, countryName: destination })
        .then((result) => {
          if (result) {
            closePopup();
            console.log(result);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className={container}>
      <div
        className="w-auto h-auto self-end cursor-pointer"
        onClick={() => {
          closePopup();
        }}
      >
        <CrossIcon />
      </div>
      <form
        action=""
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div className="">
          <div className="relative flex justify-between items-baseline">
            <label className="block" htmlFor="comment">
              Comment:
            </label>
            <span className="text-xs">{255 - comment.length}/255</span>
          </div>
          <textarea
            className="resize-none"
            name="comment"
            id="comment"
            cols={38}
            rows={5}
            maxLength={255}
            minLength={1}
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
        </div>
        <div className="flex justify-between pt-4">
          <div className="flex items-center justify-items-center gap-x-2">
            <label htmlFor="rate">Rate:</label>
            <div className="flex gap-x-2">{displayStars}</div>
          </div>
          <Button text="Comment" size="medium" type="valid" isButton={false} />
        </div>
      </form>
    </div>
  );
}
