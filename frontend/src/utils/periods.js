import getUnixTime from "date-fns/getUnixTime";

const dateRegexp = new RegExp(
  /^([1-9][0-9]{3})\s*[.]\s*([A-Za-záéiíoóöőuúüűÁÉIÍOÓÖŐUÚÜŰä]{5,10}).*$/,
);

const monthArray = [
  "január",
  "február",
  "március",
  "május",
  "június",
  "július",
  "augusztus",
  "szeptember",
  "október",
  "november",
  "december",
];

const monthIndex = (month) =>
  monthArray.findIndex(
    (thisMonth) => thisMonth.toLowerCase() === month.toLowerCase(),
  ) + 1;

export const getPeriodTimeStamp = (period) =>
  getUnixTime(
    new Date(
      period.match(dateRegexp)[1],
      monthIndex(period.match(dateRegexp)[2]),
      15,
    ),
  );
