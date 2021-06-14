import StarFilled from "components/elements/IconsComponents/StarFilled";
import ctl from "helpers/ctl";
import formatDate from "helpers/formatDate";
import React, { ReactElement } from "react";
import { Review } from "types";

interface AppProperties {
  comment: Review;
}

const container = ctl(`
flex 
flex-col 
justify-center 
space-y-2 
w-60 
h-44 
p-2 
bg-white 
rounded-md
text-sm 
text-center
`);

export default function Comment({ comment }: AppProperties): ReactElement {
  const stars = [];
  const date = formatDate(comment.createdAt, "-");

  for (let index = 0; index < comment.score; index += 1) {
    stars.push(<StarFilled key={index} size={10} />);
  }
  return (
    <div className={container}>
      <div>
        <p>{comment.comment}</p>
      </div>
      <div className="flex justify-center space-x-1">{stars}</div>
      <div className="flex flex-col">
        <span>{comment.user.username}</span>
        <span className="text-gray-500 text-xs italic">{date}</span>
      </div>
    </div>
  );
}
