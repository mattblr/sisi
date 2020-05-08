import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_NUMOFRESULTS } from "../resolvers";

const Pagination = (props: any) => {
  const [maxPages, setMaxPages] = useState(1);
  let pagesArr = [1];

  useQuery(GET_NUMOFRESULTS, {
    onCompleted: (d) => {
      setMaxPages(Math.ceil(d.noOfResults / props.pageSize));
    },
  });

  for (; pagesArr.length < maxPages; ) {
    pagesArr.push(pagesArr.length + 1);
  }

  return (
    <div className="page-number-container">
      {pagesArr.map((page: number) => {
        return (
          <div
            key={page}
            className={
              props.pageNumber === page
                ? "page-number-item-selected"
                : "page-number-item"
            }
            onClick={() => {
              props.setPageNumber(page);
            }}
          >
            {page}
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;
