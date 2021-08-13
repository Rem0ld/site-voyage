/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import savePicture from "apis/server/pictureRoute";
import Button from "components/Elements/Button";
import ctl from "helpers/ctl";
import React, { ReactElement, useState } from "react";
import CrossIcon from "../Elements/IconsComponents/CrossIcon";

interface AppProperties {
  closePopup: () => void;
  // destination: string;
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

export default function FormPicture({
  closePopup,
}: AppProperties): ReactElement {
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState<File>();
  const working = false;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (picture)
      savePicture(picture)
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPicture(event.target.files[0]);
    }
  };

  return (
    <div className={container}>
      {working ? (
        <>
          <div className="flex justify-between mb-4">
            <div className="w-4 h-4" />
            <h2 className="font-bold text-center">Upload an image</h2>
            <div
              className="grid place-items-center w-auto h-auto cursor-pointer"
              onClick={() => {
                closePopup();
              }}
            >
              <CrossIcon />
            </div>
          </div>
          <form
            action=""
            onSubmit={(event) => {
              handleSubmit(event);
            }}
            encType="multipart/form-data"
          >
            <div className="">
              <div className="mb-4">
                <label htmlFor="picture">Choose a file:</label>
                <input
                  type="file"
                  name="picture"
                  id="picture"
                  onChange={onImageChange}
                />
              </div>
              <div className="relative flex justify-between items-baseline">
                <label className="block" htmlFor="description">
                  Please give a quick description of the picture:
                </label>
                <span className="text-xs">{255 - description.length}/255</span>
              </div>
              <textarea
                className="resize-none"
                name="comment"
                id="comment"
                cols={38}
                rows={3}
                maxLength={255}
                minLength={1}
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
            <div className="grid place-items-center">
              <Button
                text="Upload"
                size="medium"
                type="valid"
                isButton={false}
              />
            </div>
          </form>
        </>
      ) : (
        <p>Not working yet...</p>
      )}
    </div>
  );
}
