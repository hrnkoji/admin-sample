import { useLocation } from 'react-router-dom';

type QueryParams = {
  [key: string]: string;
};

export default function () {
  const query = new URLSearchParams(useLocation().search);
  const queryParams: QueryParams = {};
  query.forEach(function (value, key) {
    queryParams[key] = value;
  });

  return {
    query,
    queryParams,
  };
}
