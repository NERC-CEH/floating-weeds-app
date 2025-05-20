import axios from 'axios';

let requestCancelToken: any;

const fetchRecords = async (
  northWest: any,
  southEast: any,
  isLongPeriod?: boolean
) => {
  const params = {
    survey: 'bloominAlgae',
    report: 'appMap',
    period: isLongPeriod ? '12M' : '1M',
    tlLat: northWest.lat,
    tlLon: northWest.lng,
    brLat: southEast.lat,
    brLon: southEast.lng,
  };

  if (requestCancelToken) {
    requestCancelToken.cancel();
  }

  requestCancelToken = axios.CancelToken.source();

  let newRecords: any = [];
  try {
    const process = axios(
      `https://eip.ceh.ac.uk/hydrology-ukscape/bloominAlgae`,
      {
        params,
        cancelToken: requestCancelToken.token,
      }
    );

    const { data } = await process;

    newRecords = data.data;
  } catch (e) {
    if (axios.isCancel(e)) {
      return null;
    }
  }

  return newRecords;
};

export default fetchRecords;
