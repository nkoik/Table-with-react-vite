import { Children, FC, PropsWithChildren, cloneElement } from "react"
import { Sorting } from "@/enums/table"
import arrowDown from "@/assets/icons/arrow-down.svg"
import arrowUp from "@/assets/icons/arrow-up.svg"

const TableHeadDefaultProps = {
    sortKey: "",
    sortDir: Sorting.Descending,
    onSort: null
};

const TableColumnDefaultProps = {
    sortable: true,
    sortDir: Sorting.Descending,
    onSort: null,
    className: "",
    cellProps: {}
  };

export const TableHead: FC<PropsWithChildren<typeof TableHeadDefaultProps>> = ({ sortKey, sortDir, onSort, children, ...rest }) => {
  const hasSorting: boolean = !!(sortDir && sortKey && onSort)
  const headers = !hasSorting
    ? children
    : Children.map(children, (child) => {
        return cloneElement(child, {
          onSort,
          sortDir: child?.props.id === sortKey ? sortDir : false,
          sortable: !hasSorting ? false : child?.props.sortable
        });
      });
  return (
    <thead {...rest}>
      <tr>{headers}</tr>
    </thead>
  );
};

TableHead.defaultProps = TableHeadDefaultProps


export const TableColumn: FC<PropsWithChildren<typeof TableColumnDefaultProps>> = ({
  id,
  children,
  cellProps,
  className,
  sortable,
  sortDir,
  onSort
}) => {
  const canSort = onSort && sortable

  return (
    <th
      key={id}
      align="left"
      className={"nowrap cursor-pointer " + className}
      {...cellProps}
    >
      {canSort ? (
        <span
          onClick={() => onSort(id)}
        >
          {children}
          {canSort && !!sortDir ? (
            <img className="inline px-1" src={ sortDir === Sorting.Descending ? arrowDown : arrowUp } width={20} height={20} />
          ) : null}
        </span>
      ) : (
        children
      )}
    </th>
  );
};

TableColumn.defaultProps = TableColumnDefaultProps

export default TableColumn;
