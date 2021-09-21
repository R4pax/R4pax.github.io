import React from "react";
import { createEvent } from "effector";

export default function Component3() {
  const extractPartOfArray = createEvent();

  const array = extractPartOfArray.map((arr) => arr.slice(2));

  array.watch((part) => {
    console.log(part);
  });

  extractPartOfArray([1, 2, 3, 4, 5, 6]);

  return <div className="component component_3"></div>;
}
