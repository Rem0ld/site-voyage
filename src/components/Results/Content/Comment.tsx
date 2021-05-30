import StarFilled from "components/elements/IconsComponents/StarFilled";
import React, { ReactElement } from "react";

export default function Comment(): ReactElement {
  return (
    <div className="flex flex-col space-y-2 w-60 h-44 p-2 bg-white rounded-sm text-xs text-center">
      <div>
        <p>
          This a comment which is longer than usual but must stay in the 255
          character limit This a comment which is longer than usual but must
          stay in the 255 character limit This a comment which is longer than
          usual but must stay in the 255 limit
        </p>
      </div>
      <div className="flex justify-center space-x-1">
        <StarFilled />
        <StarFilled />
        <StarFilled />
      </div>
      <div>
        <span>Pierrot</span>
      </div>
    </div>
  );
}
