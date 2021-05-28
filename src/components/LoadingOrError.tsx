import Lottie from "lottie-react";
import React, { ReactElement } from "react";
import plane from "../../public/9844-loading-40-paperplane.json";

interface Properties {
  error?: Error;
}
export default function LoadingOrError({ error }: Properties): ReactElement {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-xl">
        {error ? (
          error.message
        ) : (
          <div>
            <Lottie
              animationData={plane}
              className="md:w-96 md:h-96 w-60 h-60"
            />
          </div>
        )}
      </h1>
    </div>
  );
}
LoadingOrError.defaultProps = {
  error: undefined,
};
