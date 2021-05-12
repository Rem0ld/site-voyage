import Lottie from "lottie-react";
import React, { ReactElement } from "react";
import loader from "../../public/29582-looping-idle-location-animation.json";

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
          <Lottie animationData={loader} className="w-96 h-96" />
        )}
      </h1>
    </div>
  );
}
LoadingOrError.defaultProps = {
  error: undefined,
};
