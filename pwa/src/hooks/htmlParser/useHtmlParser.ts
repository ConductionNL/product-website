import * as React from "react";

import { attributesToProps } from "html-react-parser";
import { getHeader } from "./header/getHeader";
import { getAnchor } from "../../hooks/htmlParser/anchor/getAnchor";
import { getListItem } from "./listItem/getListItem";
import { getImage } from "./image/getImage";
import { getList } from "./list/getList";
import { getParagraph } from "./paragraph/getParagraph";
import { getBlockquote } from "./getBlockquote/getBlockquote";
import { getTable } from "./table/getTable";
import { getTableRow } from "./tableRow/getTableRow";
import { getTableHeader } from "./tableHeader/getTableHeader";
import { getTableHeaderCell } from "./tableHeaderCell/getTableHeaderCell";
import { getTableBody } from "./tableBody/getTableBody";
import { getTableCell } from "./tableCell/getTableCell";
import { getCode } from "./code/getCode";

export const useHtmlParser = () => {
  const options = {
    replace: ({ attribs, parent, children, name }: any) => {
      if (!attribs) {
        return;
      }

      const props = attributesToProps(attribs);

      if (attribs && (name === "h1" || name === "h2" || name === "h3" || name === "h4")) {
        return getHeader(name, props, children, options);
      }

      if (attribs && name === "p") {
        return getParagraph(props, children, options);
      }

      if (attribs && name === "a") {
        return getAnchor(props, children, options);
      }

      if (attribs && (name === "ol" || name === "ul")) {
        return getList(name, props, children, options);
      }

      if (attribs && name === "li") {
        return getListItem(props, parent, children, options);
      }

      if (attribs && name === "img") {
        return getImage(props);
      }

      if (attribs && name === "blockquote") {
        return getBlockquote(children, options);
      }

      if (attribs && name === "table") {
        return getTable(props, children, options);
      }

      if (attribs && name === "tr") {
        return getTableRow(props, children, options);
      }

      if (attribs && name === "thead") {
        return getTableHeader(props, children, options);
      }

      if (attribs && name === "th") {
        return getTableHeaderCell(props, children, options);
      }

      if (attribs && name === "tbody") {
        return getTableBody(props, children, options);
      }

      if (attribs && name === "td") {
        return getTableCell(props, children, options);
      }

      if (attribs && name === "code") {
        return getCode(props, children, options);
      }
    },
  };

  return { options };
};
