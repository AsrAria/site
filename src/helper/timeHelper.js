// MARK: functions

export const formatDateTime = isoTime => {
  if (isoTime === undefined) return "-";
  return isoTime.replace("T", " ");
};
