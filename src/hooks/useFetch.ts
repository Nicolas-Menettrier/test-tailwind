/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import _ from "lodash";

export default function useFetch<T>(
  defaultValue: T,
  getData: (queryString?: string) => Promise<T>,
  defaultQueryValue?: Array<{ key: string; value: string }>
): {
  error: null | Error;
  update: () => void;
  data: T;
  updateQueryValue: (
    key: string,
    value: string,
    withoutTimeout?: boolean
  ) => void;
  mutate: (callback: (newData: T) => T) => void;
} {
  const [data, setData] = useState<T>(defaultValue);
  const [error, setError] = useState<null | Error>(null);
  const [query, setQuery] = useState<Array<{ key: string; value: string }>>(
    defaultQueryValue || []
  );
  const [, setTimeoutQuery] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );

  const update = (): void => {
    let queryString = "";

    if (query.length > 0) {
      queryString = _.reduce(
        query,
        (acc: string, el: { key: string; value: string }) =>
          `${acc}${el.key}=${el.value.toString()}&`,
        "?"
      );

      queryString = queryString.slice(0, queryString.length - 1);
    }
    getData(queryString)
      .then((res) => setData(res))
      .catch((err) => setError(err));
  };

  const updateQuery = (key: string, value: string): void => {
    setQuery((prevQuery) => {
      const index = prevQuery.findIndex((el) => el.key === key);

      if (index !== -1) {
        if (!value || value === "") {
          const queries = [...prevQuery];
          _.pullAt(queries, index);
          return queries;
        }
        return prevQuery.map((el) => {
          if (el.key === key) {
            return { key, value };
          }
          return el;
        });
      }

      return [...prevQuery, { key, value }];
    });
  };

  const updateQueryValue = (
    key: string,
    value: string,
    withoutTimeout?: boolean
  ): void => {
    // Attend 500 ms pour pas spammer les requêtes
    if (withoutTimeout) {
      updateQuery(key, value);
    } else {
      setTimeoutQuery((prev) => {
        if (prev) {
          clearTimeout(prev);
        }
        return setTimeout(() => {
          updateQuery(key, value);
          setTimeoutQuery(null);
        }, 500);
      });
    }
  };

  const mutate = (mutation: (newData: T) => T) => {
    setData((prev) => mutation(prev));
  };

  useEffect(() => {
    update();
  }, [JSON.stringify(query)]);

  return { update, data, updateQueryValue, error, mutate };
}
