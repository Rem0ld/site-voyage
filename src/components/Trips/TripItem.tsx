/* eslint-disable jsx-a11y/click-events-have-key-events */
import { getCountryPerName } from "api/server/countryRoutes";
import Button from "components/elements/Button";
import DeleteIcon from "components/elements/IconsComponents/DeleteIcon";
import ValidIcon from "components/elements/IconsComponents/ValidIcon";
import Links from "components/Links/Links";
import formatDate from "helpers/formatDate";
import React, { ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import { Travel } from "types";
import FormComment from "./FormComment";
import FormPicture from "./FormPicture";

interface AppProperties {
  travel: Travel;
  updateTravel: (id: number) => void;
  deleteTravel: (id: number) => void;
}

export default function TripItem({
  travel,
  updateTravel,
  deleteTravel,
}: AppProperties): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [isSendingComment, setIsSendingComment] = useState(false);
  const [isSendingPicture, setIsSendingPicture] = useState(false);
  const history = useHistory();

  const toggleOpen = (): void => {
    setIsOpen((previousState) => !previousState);
  };

  const handleClickDetail = (name: string) =>
    getCountryPerName(name).then((result) => {
      history.push({
        pathname: "/results",
        state: [result],
      });
    });

  const departureDate = travel.departureDate
    ? formatDate(travel.departureDate, "/")
    : "";
  const returnDate = travel.returnDate
    ? formatDate(travel.returnDate, "/")
    : "";

  return (
    <div className="w-full mt-4 pb-2 border-gray-400 border-b-2">
      <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-2 ">
        <div
          className="flex items-center w-auto cursor-pointer"
          onClick={toggleOpen}
          tabIndex={0}
          role="button"
        >
          <h4 className="pr-4 text-lg font-semibold ">{travel.destination}</h4>
          {departureDate || returnDate ? (
            <span>
              {departureDate} - {returnDate}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="margin-children relative flex md:justify-end justify-evenly items-center  w-auto">
          <Button
            text="Detail"
            type="standard"
            size="medium"
            isButton
            onclick={() => {
              handleClickDetail(travel.destination).finally(() => {});
            }}
          />
          {travel.done ? (
            <>
              {isSendingComment ? (
                <FormComment
                  destination={travel.destination}
                  closePopup={() => {
                    setIsSendingComment(false);
                  }}
                />
              ) : (
                ""
              )}
              <Button
                text="Comment"
                type="standard"
                size="medium"
                isButton
                onclick={() => {
                  setIsSendingComment(!isSendingComment);
                }}
              />
              {isSendingPicture ? (
                <FormPicture
                  destination={travel.destination}
                  closePopup={() => {
                    setIsSendingPicture(false);
                  }}
                />
              ) : (
                ""
              )}
              <Button
                text="Add picture"
                type="standard"
                size="medium"
                isButton
                onclick={() => {
                  setIsSendingPicture(!isSendingPicture);
                }}
              />
            </>
          ) : (
            ""
          )}

          <div className="flex">
            {!travel.done ? (
              <div
                className="pr-2"
                onClick={() => {
                  updateTravel(travel.id as number);
                }}
                tabIndex={0}
                role="button"
              >
                <ValidIcon />
              </div>
            ) : (
              ""
            )}
            <div
              onClick={() => {
                deleteTravel(travel.id as number);
              }}
              tabIndex={0}
              role="button"
            >
              <DeleteIcon />
            </div>
          </div>
        </div>
      </div>
      {isOpen ? (
        <div className="flex md:flex-row flex-col justify-between gap-4 w-4/5 mx-auto mt-4 mb-2 ">
          <Links />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
